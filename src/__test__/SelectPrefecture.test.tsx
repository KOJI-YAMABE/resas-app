import { describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { createStore } from 'jotai'
import { Provider } from 'jotai'
import SelectPrefecture from '../components/SelectPrefecture'
import { mockPrefectures } from '../__mocks__/mockData'
import { checkedPrefectureState, prefecturesState } from '../atoms/resasAtom'

// 共通のセットアップ関数
const renderSelectPrefecture = async () => {
    const store = createStore()
    // 都道府県データをセット
    store.set(prefecturesState, mockPrefectures)
    await act(async () => {
        render(
            <Provider store={store}>
                <SelectPrefecture />
            </Provider>
        )
    })
    return store
}

describe('SelectPrefecture', () => {
    test('都道府県取得APIのレンダリングが正しく表示されているか', async () => {
        await renderSelectPrefecture()

        // ローディング中の Skeleton が表示されていることを確認
        await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument()
        })

        // 都道府県リストが表示されるのを待つ
        await waitFor(() => {
            expect(screen.getByText('都道府県選択')).toBeInTheDocument()
            expect(screen.getByText('北海道')).toBeInTheDocument()
            expect(screen.getByText('青森県')).toBeInTheDocument()
            expect(screen.getByText('岩手県')).toBeInTheDocument()
            expect(screen.getByText('宮城県')).toBeInTheDocument()
            expect(screen.getByText('秋田県')).toBeInTheDocument()
            expect(screen.getByText('山形県')).toBeInTheDocument()
            expect(screen.getByText('福島県')).toBeInTheDocument()
            expect(screen.getByText('茨城県')).toBeInTheDocument()
            expect(screen.getByText('栃木県')).toBeInTheDocument()
            expect(screen.getByText('群馬県')).toBeInTheDocument()
            expect(screen.getByText('埼玉県')).toBeInTheDocument()
            expect(screen.getByText('千葉県')).toBeInTheDocument()
            expect(screen.getByText('東京都')).toBeInTheDocument()
            expect(screen.getByText('神奈川県')).toBeInTheDocument()
            expect(screen.getByText('新潟県')).toBeInTheDocument()
            expect(screen.getByText('富山県')).toBeInTheDocument()
            expect(screen.getByText('石川県')).toBeInTheDocument()
            expect(screen.getByText('福井県')).toBeInTheDocument()
            expect(screen.getByText('山梨県')).toBeInTheDocument()
            expect(screen.getByText('長野県')).toBeInTheDocument()
            expect(screen.getByText('岐阜県')).toBeInTheDocument()
            expect(screen.getByText('静岡県')).toBeInTheDocument()
            expect(screen.getByText('愛知県')).toBeInTheDocument()
            expect(screen.getByText('三重県')).toBeInTheDocument()
            expect(screen.getByText('滋賀県')).toBeInTheDocument()
            expect(screen.getByText('京都府')).toBeInTheDocument()
            expect(screen.getByText('大阪府')).toBeInTheDocument()
            expect(screen.getByText('兵庫県')).toBeInTheDocument()
            expect(screen.getByText('奈良県')).toBeInTheDocument()
            expect(screen.getByText('和歌山県')).toBeInTheDocument()
            expect(screen.getByText('鳥取県')).toBeInTheDocument()
            expect(screen.getByText('島根県')).toBeInTheDocument()
            expect(screen.getByText('岡山県')).toBeInTheDocument()
            expect(screen.getByText('広島県')).toBeInTheDocument()
            expect(screen.getByText('山口県')).toBeInTheDocument()
            expect(screen.getByText('徳島県')).toBeInTheDocument()
            expect(screen.getByText('香川県')).toBeInTheDocument()
            expect(screen.getByText('愛媛県')).toBeInTheDocument()
            expect(screen.getByText('高知県')).toBeInTheDocument()
            expect(screen.getByText('福岡県')).toBeInTheDocument()
            expect(screen.getByText('佐賀県')).toBeInTheDocument()
            expect(screen.getByText('長崎県')).toBeInTheDocument()
            expect(screen.getByText('熊本県')).toBeInTheDocument()
            expect(screen.getByText('大分県')).toBeInTheDocument()
            expect(screen.getByText('宮崎県')).toBeInTheDocument()
            expect(screen.getByText('鹿児島県')).toBeInTheDocument()
            expect(screen.getByText('沖縄県')).toBeInTheDocument()
        })
    })

    test('都道府県の選択が機能するか', async () => {
        const store = await renderSelectPrefecture()

        // ラベルがレンダリングされるのを待機
        await waitFor(() => {
            expect(screen.getByLabelText('北海道')).toBeInTheDocument()
        })

        const hokkaidoRadio = screen.getByLabelText('北海道')
        fireEvent.click(hokkaidoRadio)

        await waitFor(() => {
            const checkedPrefecture = store.get(checkedPrefectureState)
            expect(checkedPrefecture?.prefName).toBe('北海道')
        })
    })

    test('スクロールが正しく動作するか', async () => {
        await renderSelectPrefecture()

        const scrollToMock = vi.fn()
        window.scrollTo = scrollToMock

        await waitFor(() => {
            expect(screen.getByLabelText('北海道')).toBeInTheDocument()
        })

        const hokkaidoRadio = screen.getByLabelText('北海道')
        fireEvent.click(hokkaidoRadio)

        await waitFor(() => {
            expect(scrollToMock).toHaveBeenCalledWith({
                top: window.innerHeight - 100,
                behavior: 'smooth',
            })
        })
    })
})
