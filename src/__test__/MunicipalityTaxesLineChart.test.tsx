// import '@testing-library/jest-dom'
// import { describe, it, expect, beforeEach, vi } from 'vitest'
// import type { Mock } from 'vitest'
// import { render, screen, waitFor } from '@testing-library/react'
// import { Provider, createStore } from 'jotai'

// import MunicipalityTaxesLineChart from '../components/MunicipalityTaxesLineChart'
// import { fetchMunicipalityTaxesPerPerson } from '../apis/resasApi'
// import { checkedPrefectureState } from '../atoms/resasAtom'
// import { MunicipalityTaxesPerPersonResponse } from '../types/resas'

// // 1) fetchMunicipalityTaxesPerPerson をモック化
// vi.mock('../apis/resasApi', () => ({
//     fetchMunicipalityTaxesPerPerson: vi.fn(),
// }))

// describe('MunicipalityTaxesLineChart', () => {
//     beforeEach(() => {
//         // 各テスト前にモック呼び出し状況をリセット
//         vi.clearAllMocks()
//     })

//     it('都道府県が選択されていない場合、「都道府県を選択してください」と表示される', () => {
//         // 2) Store を作成し、checkedPrefectureState を初期値 null/undefined にする
//         const store = createStore()
//         store.set(checkedPrefectureState, undefined)

//         render(
//             <Provider store={store}>
//                 <MunicipalityTaxesLineChart />
//             </Provider>
//         )

//         // ラベルを確認
//         expect(screen.getByText('都道府県を選択してください')).toBeInTheDocument()
//         // API は呼ばれないこと
//         expect(fetchMunicipalityTaxesPerPerson).not.toHaveBeenCalled()
//     })

//     it('都道府県が選択されている場合、API で地方税データを取得してグラフを表示する', async () => {
//         // 3) ダミーの地方税データ
//         const mockData: MunicipalityTaxesPerPersonResponse[] = [
//             { year: 2010, value: 1200 },
//             { year: 2011, value: 1300 },
//         ]
//         // fetchMunicipalityTaxesPerPerson が呼ばれたら、mockData を resolve
//         ;(fetchMunicipalityTaxesPerPerson as Mock).mockResolvedValueOnce(mockData)

//         // 4) Store を作成し、東京都(prefCode=13) を選択した状態に
//         const store = createStore()
//         store.set(checkedPrefectureState, { prefCode: 13, prefName: '東京都' })

//         render(
//             <Provider store={store}>
//                 <MunicipalityTaxesLineChart />
//             </Provider>
//         )

//         // 5) API が呼ばれるかチェック
//         await waitFor(() => {
//             expect(fetchMunicipalityTaxesPerPerson).toHaveBeenCalledWith(13)
//         })

//         // 6) 見出しや説明文が表示されているか確認
//         //    Recharts の内部要素はあまりテキストとして取得できない場合もあるが、タイトルや凡例などは確認可能
//         expect(screen.getByText('東京都：1人当たりの地方税推移')).toBeInTheDocument()
//         expect(screen.getByText('地方税(千円)/人')).toBeInTheDocument()
//     })
// })
