# ys-portfolio セットアップガイド

## 📦 初期セットアップ（ローカル開発）

### 1. リポジトリをクローン
```bash
git clone https://github.com/your-username/ys-portfolio.git
cd ys-portfolio
```

### 2. 依存関係をインストール
```bash
npm install
```

### 3. 開発サーバーを起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、ポートフォリオサイトが表示されます。

---

## 📝 ブログ記事の追加方法

### 新しい記事を書く

`content/posts/` に新しい `.mdx` ファイルを作成：

```mdx
---
title: "記事のタイトル"
date: "2024-01-20"
excerpt: "簡潔な説明（ブログ一覧で表示される）"
---

# 本文

## 見出し2

段落を書く...

### 見出し3

- リスト
- 複数項目

**太字**、*イタリック*、`コード`など使用可能
```

ファイルを保存すると、ブログ一覧に自動で反映されます。

---

## 🎨 VSCode側での調整ポイント

### 色のカスタマイズ

`styles/globals.css` の `:root` セクションを編集：

```css
:root {
  --color-accent-warm: #c4845a;    /* ウォームブラウン */
  --color-accent-natural: #8b7355; /* ディープブラウン */
  --color-accent-green: #6b8e63;   /* ミュートグリーン */
  /* その他の色を調整 */
}
```

### フォントの変更

`styles/globals.css` で `--font-sans` と `--font-serif` を編集。

デフォルト：
- Sans: システムフォント
- Serif: Georgia

Google Fonts などを使いたい場合：
1. `app/layout.tsx` に `@import` を追加
2. CSSで定義し直す

例：
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&display=swap');

:root {
  --font-serif: 'Noto Serif JP', serif;
}
```

### プロダクト情報の編集

`content/products.ts` を編集して、各SaaSの説明やリンクを更新：

```typescript
export const products: Product[] = [
  {
    id: 'exam-master',
    name: 'Exam Master',
    description: '試験勉強をゲーム感覚で進められる学習アプリ',
    longDescription: '(長めの説明)',
    url: 'https://exam-master-amber.vercel.app/',
    tags: ['学習', 'ゲーミフィケーション'],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  // ...
];
```

### ページレイアウトの変更

各ページは `app/` 配下の `page.tsx` で管理：
- `app/page.tsx` → ホームページ
- `app/products/page.tsx` → プロダクト一覧
- `app/blog/page.tsx` → ブログ一覧
- `app/blog/[slug]/page.tsx` → ブログ詳細

コンポーネントは `components/` に格納。

---

## 🚢 Vercelへのデプロイ

### 1. GitHubにリポジトリをプッシュ
```bash
git remote add origin https://github.com/your-username/ys-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Vercelでプロジェクトを作成
- [Vercel](https://vercel.com) にログイン
- 「New Project」をクリック
- GitHubリポジトリを選択
- デプロイ

自動で `https://ys-portfolio.vercel.app/` （またはカスタムドメイン）で公開されます。

---

## 🔧 よくある調整

### ナビゲーションリンクを追加

`components/Header.tsx` の `.nav` セクションを編集：

```tsx
<nav className={styles.nav}>
  <Link href="/">Home</Link>
  <Link href="/products">Products</Link>
  <Link href="/blog">Blog</Link>
  <Link href="/about">About</Link>  {/* 新規追加 */}
</nav>
```

### フッター情報を編集

`components/Footer.tsx` で GitHub、Twitter などのリンクを追加。

### メタデータ（タイトル・説明）を編集

`app/layout.tsx` で：

```typescript
export const metadata: Metadata = {
  title: 'YS Portfolio - Web Developer',
  description: '説明文をここに',
};
```

---

## 📚 ファイル構成一覧

```
ys-portfolio/
├── app/
│   ├── layout.tsx           # グローバルレイアウト
│   ├── page.tsx             # ホーム
│   ├── page.module.css
│   ├── blog/
│   │   ├── page.tsx         # ブログ一覧
│   │   ├── page.module.css
│   │   └── [slug]/
│   │       ├── page.tsx     # ブログ詳細
│   │       └── page.module.css
│   └── products/
│       ├── page.tsx         # プロダクト一覧
│       └── page.module.css
├── components/
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── Footer.tsx
│   ├── Footer.module.css
│   ├── ProductCard.tsx
│   ├── ProductCard.module.css
│   ├── BlogCard.tsx
│   └── BlogCard.module.css
├── content/
│   ├── products.ts          # SaaS情報
│   └── posts/
│       └── first-post.mdx   # サンプル記事
├── lib/
│   └── mdx.ts               # Markdown処理
├── styles/
│   └── globals.css          # グローバルスタイル
├── package.json
├── next.config.js
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## 💡 次のステップ

1. **記事を書く**: `content/posts/` にあなたの最初の記事を追加
2. **色を調整**: 好みに合わせて `styles/globals.css` をカスタマイズ
3. **プロダクト情報を更新**: `content/products.ts` で詳細説明を加える
4. **Vercelにデプロイ**: GitHubにプッシュして自動デプロイ
5. **独自ドメイン設定**: 後で `example.com` を取得して Vercel で設定

---

## 🤔 トラブルシューティング

### ビルドエラーが出た
```bash
rm -rf node_modules .next
npm install
npm run build
```

### ブログ記事が表示されない
- ファイルが `content/posts/` に `.mdx` 拡張子で保存されているか確認
- フロントマッターの形式が正しいか確認（`---` で囲まれているか）

### デザインが崩れた
- ブラウザのキャッシュをクリア（Ctrl+Shift+R）
- `npm run dev` を再起動

---

質問や問題があれば、VSCode側のClaudeに相談してください！
