import '@testing-library/jest-dom'
import { describe, expect, beforeEach, vi, Mock, test } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { Provider, createStore } from 'jotai'

import MunicipalityTaxesLineChart from '../components/MunicipalityTaxesLineChart'
import { fetchMunicipalityTaxesPerPerson, fetchPopulation } from '../apis/resasApi'
import { checkedPrefectureState } from '../atoms/resasAtom'
import { MunicipalityTaxesPerPersonResponse, Population } from '../types/resas'

// APIをモック化
vi.mock('../apis/resasApi', async () => {
    const originalModule = await vi.importActual('../apis/resasApi')
    return {
        ...originalModule,
        fetchMunicipalityTaxesPerPerson: vi.fn(),
        fetchPopulation: vi.fn(),
    }
})

// 共通のセットアップ関数
const renderChartWithStore = async (prefecture: { prefCode: number; prefName: string } | undefined) => {
    const store = createStore()
    store.set(checkedPrefectureState, prefecture)
    await act(async () => {
        render(
            <Provider store={store}>
                <MunicipalityTaxesLineChart />
            </Provider>
        )
    })
    return store
}

describe('MunicipalityTaxesLineChart', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test('都道府県が選択されていない場合、「都道府県を選択してください」と表示される', async () => {
        await renderChartWithStore(undefined)

        expect(screen.getByText('都道府県を選択してください')).toBeInTheDocument()
        expect(fetchMunicipalityTaxesPerPerson).not.toHaveBeenCalled()
        expect(fetchPopulation).not.toHaveBeenCalled()
    })

    test('都道府県が選択されている場合、一人当たりの地方税と人口のAPIデータを取得してグラフを表示する', async () => {
        const mockTaxesData: MunicipalityTaxesPerPersonResponse[] = [
            { year: 2010, value: 1200 },
            { year: 2011, value: 1300 },
        ]
        const mockPopulationData: Population[] = [
            { year: 2010, value: 1000000 },
            { year: 2011, value: 1005000 },
        ]

        ;(fetchMunicipalityTaxesPerPerson as Mock).mockResolvedValueOnce(mockTaxesData)
        ;(fetchPopulation as Mock).mockResolvedValueOnce([{ data: mockPopulationData }])

        await renderChartWithStore({ prefCode: 13, prefName: '東京都' })

        await waitFor(() => {
            expect(fetchMunicipalityTaxesPerPerson).toHaveBeenCalledWith(13)
            expect(fetchPopulation).toHaveBeenCalledWith(13)
        })
        expect(screen.getByText('東京都：地方税収入の推移')).toBeInTheDocument()
        expect(screen.getByText('地方税収入')).toBeInTheDocument()
    })
})
