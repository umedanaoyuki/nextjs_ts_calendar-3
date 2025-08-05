"use client";
import { useActionState } from "react";

const initialState = {
  message: "",
};

const Login = () => {
  return (
    <div>
      <form>
        <input type="text" name="email" placeholder="メールアドレス" required />
        <input type="text" name="password" placeholder="パスワード" required />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
