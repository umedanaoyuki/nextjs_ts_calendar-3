"use client";
import { userLogin } from "@/app/actions/userLogin";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  message: "",
};

const Login = () => {
  const [state, formAction] = useActionState(userLogin, initialState);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-2xl font-bold text-indigo-600">
          Calender App Sample
        </h2>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ログイン
          </h2>
        </div>
        <form action={formAction} className="mt-8 space-y-6">
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="email">メールアドレス</label>
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="メールアドレス"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="password">パスワード</label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="パスワード"
                required={true}
              />
              {state && <h3>{state.message}</h3>}
            </div>
          </div>
          <Button>ログイン</Button>
          <div className="text-center font-medium text-gray-900">
            アカウントを持っていませんか？
            <Link
              href="/user/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              新規登録
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
