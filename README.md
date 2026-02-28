# ys-portfolio

Next.js (App Router) で構成したポートフォリオサイトです。

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## 本番ビルド

```bash
npm run build
npm run start
```

## アクセス解析（任意）

GA4を有効化する場合は、`.env.local` に次を設定します。

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## コメント機能（任意）

Giscus を有効化する場合は、`.env.local` に次を設定します。

```bash
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_XXXXXXXXXXXX
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwXXXXXXXXXXXX
NEXT_PUBLIC_GISCUS_MAPPING=specific
```

## 支援リンク（任意）

記事末尾に支援ボタンを表示する場合は、`.env.local` に次を設定します。

```bash
NEXT_PUBLIC_SUPPORT_URL=https://buymeacoffee.com/yourname
```

## 主な構成

- `app/`: ルーティングとページ
- `public/`: 静的ファイル
- `AGENTS.md`: このリポジトリの運用ルール
- `SETUP_GUIDE.md`: 詳細セットアップと編集ガイド

## デプロイ

Vercel に GitHub 連携して `main` ブランチをデプロイしてください。

更新日時: 2026-02-27 Vercel再デプロイ用コミット
