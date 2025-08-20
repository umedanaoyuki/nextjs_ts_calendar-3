"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { login } from "@/app/actions/login";
import { LoginSchema } from "@/app/utils/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    login,
    zodResolver(LoginSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (data === null) return;
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
          setTimeout(() => {
            router.push("/");
          }, 1000);
        },
      },
      formProps: {
        defaultValues: {
          email: "",
          password: "",
        },
      },
      errorMapProps: {},
    }
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitWithAction}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="○○○@○○○.co.jpなど" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="8文字以上30文字以内で入力してください"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={action.isPending} className="">
          {action.isPending ? "ログイン中" : "ログイン"}
        </Button>
        <div className="text-center font-medium text-gray-900">
          アカウントを持っていませんか？
          <Link
            href="/user/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            新規作成
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
