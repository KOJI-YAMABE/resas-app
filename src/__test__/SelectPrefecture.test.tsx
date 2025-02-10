import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { createStore } from 'jotai'
import { Provider } from 'jotai'
import { fetchPrefectures } from '../apis/resasApi'
import SelectPrefecture from '../components/SelectPrefecture'

vi.mock('../apis/resasApi', () => ({
    fetchPrefectures: vi.fn(),
}))

describe('SelectPrefecture component (fake timers)', () => {
    beforeEach(() => {
        vi.useFakeTimers() // タイマーを偽装
        ;(fetchPrefectures as Mock).mockReset() // モックをクリア
    })

    afterEach(() => {
        vi.useRealTimers() // タイマーをリセット
    })

    it('API から取得した都道府県を表示', async () => {
        ;(fetchPrefectures as Mock).mockResolvedValueOnce([{ prefCode: 1, prefName: '北海道' }])

        // renderの前にfetchPrefecturesが呼ばれていないことを確認
        expect(fetchPrefectures).not.toHaveBeenCalled()

        render(
            <Provider store={createStore()}>
                <SelectPrefecture />
            </Provider>
        )

        // まだ3秒のタイマーは動いていない
        expect(fetchPrefectures).not.toHaveBeenCalled()

        // タイマーを3秒進める
        vi.advanceTimersByTime(3000)

        // now fetchPrefectures is called
        await waitFor(() => {
            expect(fetchPrefectures).toHaveBeenCalled()
        })

        // モックが返した "北海道" が表示されるまでさらに waitFor
        await waitFor(() => {
            expect(screen.getByLabelText('北海道')).toBeInTheDocument()
        })
    })
})
