"use client";
import SignupForm from "@/app/components/molecules/SignupForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-2xl font-bold text-indigo-600">
          Calender App Sample
        </h2>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントを作成
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            新しいアカウントを登録してください
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Register;
