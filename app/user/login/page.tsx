"use client";
import { userLogin } from "@/app/actions/userLogin";

const initialState = {
  message: "",
};

const Login = () => {
  return (
    <div>
      <form action={userLogin}>
        <input type="text" name="email" placeholder="メールアドレス" required />
        <input type="text" name="password" placeholder="パスワード" required />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
