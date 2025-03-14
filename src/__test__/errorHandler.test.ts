import { describe, expect, vi, beforeEach, test } from 'vitest'
import { apiRequest } from '../apis/apiRequest'
import { displayErrorMessage } from '../utils/displayError'
import { handleApiError } from '../utils/errorHandler'

// displayErrorMessage, apiRequest をモック化
vi.mock('../utils/displayError', () => ({
    displayErrorMessage: vi.fn(),
}))

vi.mock('../apis/apiRequest', () => ({
    apiRequest: vi.fn(),
}))

describe('handleApiError', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('data が string の場合', () => {
        test('400 のとき、メッセージを表示してエラーを throw する', () => {
            expect(() => handleApiError('400', 0, 3, '/test-path')).toThrow(
                '400 Bad Request: パラメータに誤りがあります。'
            )
            expect(displayErrorMessage).toHaveBeenCalledWith('400 Bad Request: パラメータに誤りがあります。')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('404 のとき、メッセージを表示してエラーを throw する', () => {
            expect(() => handleApiError('404', 0, 3, '/test-path')).toThrow(
                '404 Not Found: 該当する API が見つかりません。'
            )
            expect(displayErrorMessage).toHaveBeenCalledWith('404 Not Found: 該当する API が見つかりません。')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('403 のとき、メッセージを表示してエラーを throw する', () => {
            expect(() => handleApiError('403', 0, 3, '/test-path')).toThrow(
                '403 Forbidden: API キーが無効か、権限がありません。'
            )
            expect(displayErrorMessage).toHaveBeenCalledWith('403 Forbidden: API キーが無効か、権限がありません。')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('429 かつ retryCount < maxRetries のとき、1秒後にリトライする', async () => {
            const promise = handleApiError('429', 0, 3, '/test-path')
            expect(promise).toBeInstanceOf(Promise)
            await promise
            expect(displayErrorMessage).not.toHaveBeenCalled()
            expect(apiRequest).toHaveBeenCalledWith('/test-path', 1, 3)
        })

        test('429 かつ retryCount >= maxRetries のとき、エラーメッセージを出して throw', () => {
            expect(() => handleApiError('429', 3, 3, '/test-path')).toThrow(
                '429 Too Many Requests: リトライ回数を超過しました。'
            )
            expect(displayErrorMessage).toHaveBeenCalledWith('429 Too Many Requests: リトライ回数を超過しました。')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('デフォルトケース (未知のエラー文字列)', () => {
            expect(() => handleApiError('500', 0, 3, '/test-path')).toThrow('不明なエラーが発生しました: 500')
            expect(displayErrorMessage).toHaveBeenCalledWith('不明なエラーが発生しました: 500')
            expect(apiRequest).not.toHaveBeenCalled()
        })
    })

    describe('data が object の場合', () => {
        test('statusCode=400 のとき、メッセージを表示してエラー throw', () => {
            const errorObj = { statusCode: '400', message: '無効なリクエスト' }
            expect(() => handleApiError(errorObj, 0, 3, '/test-path')).toThrow('400 Bad Request: 無効なリクエスト')
            expect(displayErrorMessage).toHaveBeenCalledWith('400 Bad Request: 無効なリクエスト')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('statusCode=403 のとき、メッセージを表示してエラー throw', () => {
            const errorObj = { statusCode: '403', message: '権限がありません' }
            expect(() => handleApiError(errorObj, 0, 3, '/test-path')).toThrow('403 Forbidden: 権限がありません')
            expect(displayErrorMessage).toHaveBeenCalledWith('403 Forbidden: 権限がありません')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('statusCode=404 のとき、メッセージを表示してエラー throw', () => {
            const errorObj = { statusCode: '404', message: 'APIが見つかりません' }
            expect(() => handleApiError(errorObj, 0, 3, '/test-path')).toThrow('404 Not Found: APIが見つかりません')
            expect(displayErrorMessage).toHaveBeenCalledWith('404 Not Found: APIが見つかりません')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('statusCode=429 & retryCount < maxRetries のときリトライ', async () => {
            const errorObj = { statusCode: '429', message: 'Too many requests' }
            const promise = handleApiError(errorObj, 1, 3, '/test-path')
            expect(promise).toBeInstanceOf(Promise)
            await promise
            expect(displayErrorMessage).not.toHaveBeenCalled()
            expect(apiRequest).toHaveBeenCalledWith('/test-path', 2, 3)
        })

        test('statusCode=429 & retryCount >= maxRetries のとき throw', () => {
            const errorObj = { statusCode: '429', message: 'Too many requests' }
            expect(() => handleApiError(errorObj, 3, 3, '/test-path')).toThrow(
                '429 Too Many Requests: リトライ回数を超過しました。'
            )
            expect(displayErrorMessage).toHaveBeenCalledWith('429 Too Many Requests: リトライ回数を超過しました。')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('statusCode=500 のような想定外ステータス', () => {
            const errorObj = { statusCode: '500', message: 'Internal Server Error' }
            expect(() => handleApiError(errorObj, 0, 3, '/test-path')).toThrow(
                'API エラーが発生しました: 500 Internal Server Error'
            )
            expect(displayErrorMessage).toHaveBeenCalledWith('API エラーが発生しました: 500 Internal Server Error')
            expect(apiRequest).not.toHaveBeenCalled()
        })

        test('statusCode プロパティが無い object はそのまま resolve される', async () => {
            const obj = { foo: 'bar' }
            await expect(handleApiError(obj, 0, 3, '/test-path')).resolves.toEqual(obj)
            expect(displayErrorMessage).not.toHaveBeenCalled()
            expect(apiRequest).not.toHaveBeenCalled()
        })
    })

    test('data が string でも object でもない (number, boolean, undefined など) はそのまま resolve される', async () => {
        const input = 123
        await expect(handleApiError(input, 0, 3, '/test-path')).resolves.toEqual(123)
        expect(displayErrorMessage).not.toHaveBeenCalled()
        expect(apiRequest).not.toHaveBeenCalled()
    })
})
