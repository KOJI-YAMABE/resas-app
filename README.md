# RESAS App

## システム概要

RESAS Appは、都道府県ごとの地方税収入の推移を可視化するためのWebアプリケーションです。ユーザーは都道府県を選択し、その都道府県の税収データをグラフで確認することができます。

## ローカル環境での立ち上げ方、使用方法

### 前提条件

- Node.js (推奨バージョン: 16.x以上)
- npm または yarn

### セットアップ手順

1. リポジトリをクローンします。

    ```bash
    git clone https://github.com/KOJI-YAMABE/resas-app.git
    cd resas-app
    ```

2. 依存関係をインストールします。

    ```bash
    npm install
    ```

3. 開発サーバーを起動します。

    ```bash
    npm run dev
    ```

4. ブラウザで `http://localhost:5173/` を開き、アプリケーションを確認します。

## テストの実施方法

1. テストを実行するには、以下のコマンドを使用します。

    ```bash
    npm run test
    ```

2. テスト結果がターミナルに表示されます。

## 使用技術

### フロントエンド

- **React v19**: UIライブラリ
- **Jotai**: 状態管理
- **Recharts**: グラフ描画ライブラリ
- **Tailwind CSS**: スタイリング
- **React Icons**: アイコン

### ビルドツール

- **Vite**: 開発サーバーとビルドツール

### テスト

- **Vitest**: テストランナー
- **@testing-library/react**: Reactコンポーネントのテスト

### その他

- **TypeScript**: 型安全なJavaScript
- **ESLint**: コード品質ツール
- **Prettier**: コードフォーマッター
