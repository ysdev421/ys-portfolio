import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>ページが見つかりません</h1>
      <p className={styles.lead}>
        お探しのページは移動または削除された可能性があります。
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primary}>
          トップページへ
        </Link>
        <Link href="/blog" className={styles.secondary}>
          ブログ一覧
        </Link>
      </div>
    </main>
  );
}
