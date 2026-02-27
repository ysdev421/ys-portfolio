# ys-portfolio

個人のポートフォリオ＆ブログサイト

## 📁 ファイル構成

```
ys-portfolio/
├── app/
│   ├── layout.tsx           # グローバルレイアウト
│   ├── page.tsx             # ホームページ
│   ├── blog/
│   │   ├── page.tsx         # ブログ一覧
│   │   └── [slug]/page.tsx  # ブログ詳細
│   └── products/
│       └── page.tsx         # プロダクト一覧
├── components/
│   ├── Header.tsx           # ヘッダー
│   ├── Footer.tsx           # フッター
│   ├── ProductCard.tsx      # プロダクトカード
│   └── BlogCard.tsx         # ブログカード
├── content/
│   ├── products.ts          # プロダクト情報（静的データ）
│   └── posts/               # ブログ記事（MDXファイル）
│       └── sample.mdx
├── styles/
│   └── globals.css          # グローバルスタイル
├── lib/
│   └── mdx.ts               # MDX処理用ユーティリティ
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🚀 セットアップ

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開く

## 📝 ブログの書き方

`content/posts/` に `.mdx` ファイルを作成

```mdx
---
title: "記事のタイトル"
date: "2024-01-01"
excerpt: "簡潔な説明"
---

# 本文
記事の内容をここに書く
```

## 🎨 プロダクト情報の更新

`content/products.ts` で各SaaSの情報を管理。追加・編集はここで。

## 🔧 拡張のコツ

- **色変更**: `styles/globals.css` で CSS変数を編集
- **ページ追加**: `app/` に新しいフォルダ追加 + `page.tsx` 作成
- **コンポーネント**: `components/` に新規ファイル作成

## 🚢 デプロイ

Vercelに `ys-portfolio` リポジトリを接続して自動デプロイ

## 📝 次のステップ

VSCode側のClaudeで以下を調整：
- デザイン微調整（色、フォント、レイアウト）
- 記事の追加執筆
- 機能拡張（お問い合わせフォームなど）
