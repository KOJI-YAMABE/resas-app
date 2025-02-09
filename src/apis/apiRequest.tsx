import { handleApiError } from '../utils/errorHandler'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * 簡易的なリトライ機能付きの API リクエスト関数
 * @param path リクエストパス (例: "/api/v1/prefectures")
 * @param retryCount 現在のリトライ回数（呼び出し側では通常指定不要）
 * @param maxRetries リトライの最大回数
 */

// 以下、RESASのエラーハンドリングを処理するための API リクエスト関数
// https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html

export async function apiRequest<T>(path: string, retryCount = 0, maxRetries = 3): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'X-API-KEY': API_KEY },
    })

    if (!res.ok) {
        throw new Error(`サーバーエラーが発生しました: HTTP ${res.status}`)
    }

    let data: unknown
    try {
        data = await res.json()
    } catch (err) {
        throw new Error('レスポンスの JSON パースに失敗しました')
    }

    // エラーハンドリングを別ファイルで管理
    data = await handleApiError(data, retryCount, maxRetries, path)

    const typedData = data as { result: T }
    return typedData.result
}
