import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export const LoginLayout = () => {
  return (
    <div className="relative">
      <header className="bg-white fixed top-0 left-0 right-0 leading-[50px]">
        <div className="sm:container sm:mx-auto flex justify-between">
          <p className="logo">
            <Link href="/">スケジュール管理APP</Link>
          </p>
          <nav>
            <ul className="flex justify-center gap-5 text-lime-800">
              <li className="flex items-center">
                <FaUser />
                <p>テストユーザー</p>
              </li>
              <li className="flex items-center">
                <MdLogout />
                <Link href="/login">ログアウト</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};
