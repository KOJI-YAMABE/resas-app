import '@testing-library/jest-dom'
import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'

// Jest-dom の追加マッチャーを Vitest の expect に統合
expect.extend(matchers)

// ResizeObserver が無ければポリフィルを適用
if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = ResizeObserver
}
