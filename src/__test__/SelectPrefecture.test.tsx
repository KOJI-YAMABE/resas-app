import '@testing-library/jest-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Mock } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'jotai'

import { fetchPrefectures } from '../apis/resasApi'
import SelectPrefecture from '../components/SelectPrefecture'

// 1) fetchPrefectures をモック化
vi.mock('../apis/resasApi', () => ({
    fetchPrefectures: vi.fn(),
}))

describe('SelectPrefecture component', () => {
    // 2) window.scrollTo をモック化（呼ばれたかどうかをテストするため）
    beforeEach(() => {
        window.scrollTo = vi.fn()
    })

    it('API から取得した都道府県を表示し、ラジオボタンを選択できる', async () => {
        // 3) ダミーの都道府県配列
        const mockPrefectures = [
            { prefCode: 1, prefName: '北海道' },
            { prefCode: 13, prefName: '東京都' },
            { prefCode: 17, prefName: '石川県' },
        ]
        // fetchPrefectures が呼ばれたら、この配列をresolveする
        ;(fetchPrefectures as Mock).mockResolvedValueOnce(mockPrefectures)

        // 4) コンポーネントを Provider でラップしてレンダリング
        //    jotai を使うコンポーネントは、必ず Provider で包む必要があります
        render(
            <Provider>
                <SelectPrefecture />
            </Provider>
        )

        // 5) 非同期で pref が読み込まれるまで待つ
        //    その後 ラジオボタン（ラベル付き）を取得できるか確認
        await waitFor(() => {
            expect(screen.getByLabelText('北海道')).toBeInTheDocument()
            expect(screen.getByLabelText('東京都')).toBeInTheDocument()
            expect(screen.getByLabelText('石川県')).toBeInTheDocument()
        })

        // 6) ラジオボタンをクリック → 選択状態になるか
        const tokyoRadio = screen.getByLabelText('東京都') as HTMLInputElement
        expect(tokyoRadio.checked).toBe(false) // まだ未チェック
        await userEvent.click(tokyoRadio)
        // クリック後に checked = true になるか
        expect(tokyoRadio.checked).toBe(true)

        // 7) 選択時のスクロールが呼ばれたか
        //    実装では setTimeout(...,100) があるので、waitFor で待つ
        await waitFor(() => {
            expect(window.scrollTo).toHaveBeenCalledWith({
                top: window.innerHeight - 100,
                behavior: 'smooth',
            })
        })
    })
})
