"use client";

import Link from "next/link";

const Error = () => {
  return (
    <div>
      <h1>エラーが発生しました（500 server error）</h1>
      <Link href="/user/login">ホームに戻る</Link>
    </div>
  );
};

export default Error;
