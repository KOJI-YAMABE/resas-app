// src/utils/errorHandler.ts

import { apiRequest } from '../apis/apiRequest'

export function handleApiError(
    data: unknown,
    retryCount: number,
    maxRetries: number,
    path: string
): never | Promise<unknown> {
    if (typeof data === 'string') {
        switch (data) {
            case '400':
                throw new Error('400 Bad Request: パラメータに誤りがあります。')
            case '404':
                throw new Error('404 Not Found: 該当する API が見つかりません。')
            case '403':
                throw new Error('403 Forbidden: API キーが無効か、権限がありません。')
            case '429':
                if (retryCount < maxRetries) {
                    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                        return apiRequest(path, retryCount + 1, maxRetries)
                    })
                } else {
                    throw new Error('429 Too Many Requests: リトライ回数を超過しました。')
                }
            default:
                throw new Error(`不明なエラーが発生しました: ${data}`)
        }
    } else if (typeof data === 'object' && data !== null) {
        const obj = data as { statusCode?: string; message?: string; description?: string }

        if (obj.statusCode) {
            switch (obj.statusCode) {
                case '400':
                    throw new Error(`400 Bad Request: ${obj.message || 'パラメータに誤りがあります。'}`)
                case '403':
                    throw new Error(`403 Forbidden: ${obj.message || 'API キーが無効か権限がありません。'}`)
                case '404':
                    throw new Error(`404 Not Found: ${obj.message || '該当する API が見つかりません。'}`)
                case '429':
                    if (retryCount < maxRetries) {
                        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                            return apiRequest(path, retryCount + 1, maxRetries)
                        })
                    } else {
                        throw new Error(`429 Too Many Requests: リトライ回数を超過しました。`)
                    }
                default:
                    throw new Error(`API エラーが発生しました: ${obj.statusCode} ${obj.message ?? ''}`)
            }
        }
    }
    return Promise.resolve(data)
}
