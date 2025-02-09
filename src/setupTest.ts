import '@testing-library/jest-dom'
import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import ResizeObserver from 'resize-observer-polyfill'
// toBeInTheDocument などを expect が使えるようにする
expect.extend(matchers)
if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = ResizeObserver
}
