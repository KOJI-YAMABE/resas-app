import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom', // DOM操作やReact Testing Libraryを使う
        globals: true, // it(), describe(), expect() をjest風に使える
        // setupFiles: ['src/setupTests.ts'], // テスト実行前に読み込むファイル
    },
})
