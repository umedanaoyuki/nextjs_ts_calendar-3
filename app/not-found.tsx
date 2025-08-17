import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404エラー - Page Not Found</h1>
      <Link href="/user/login">ログインページに戻る</Link>
    </>
  );
}
