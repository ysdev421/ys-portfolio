# ys-portfolio セットアップガイド

このプロジェクトは Next.js(App Router) ベースのポートフォリオサイトです。

## 前提環境

- Node.js 20 以上
- npm

## ローカル起動

```bash
npm install
npm run dev
```

`http://localhost:3000` を開いて確認します。

## 本番ビルド確認

```bash
npm run build
npm run start
```

## 環境変数（任意）

GA4 を使う場合のみ `.env.local` に設定します。

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## ディレクトリ概要

- `app/`: ルーティングとページ実装
- `lib/`: 記事・プロダクトなどのデータ
- `public/`: 静的アセット

## コンテンツ編集

### 記事データ

記事は [lib/posts.ts](./lib/posts.ts) で管理しています。

- `title`, `summary`, `category`, `tags`
- `publishedAt`, `updatedAt`, `reviewedAt`
- `sections`（本文）

### プロダクトデータ

SaaS 情報は [lib/products.ts](./lib/products.ts) を編集します。

- 公開中: `status: "live"` と `url` を設定
- 準備中: `status: "coming_soon"`

## 品質チェック

```bash
npm run lint
npm run build
```

PR 前は上記 2 つが通る状態にしてください。

## デプロイ

Vercel で `main` ブランチをデプロイします。

更新日: 2026-02-28
