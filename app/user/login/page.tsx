"use client";
import { userLogin } from "@/app/actions/userLogin";
import { useActionState } from "react";

const initialState = {
  message: "",
};

const Login = () => {
  const [state, formAction] = useActionState(userLogin, initialState);
  return (
    <div>
      <form action={formAction}>
        <input type="text" name="email" placeholder="メールアドレス" required />
        <input type="text" name="password" placeholder="パスワード" required />
        {state && <h3>{state.message}</h3>}
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
