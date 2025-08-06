"use client";
import { userLogin } from "@/app/actions/userLogin";
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
              <input
                id="email"
                type="text"
                name="email"
                placeholder="メールアドレス"
                className="appearance-none rounded-[5px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password">パスワード</label>
              <input
                id="password"
                type="text"
                name="password"
                className="appearance-none rounded-[5px] relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
                required
              />
              {state && <h3>{state.message}</h3>}
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ログイン
          </button>
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
