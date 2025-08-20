"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { sigup } from "@/app/actions/signup";
import { SignupSchema } from "@/app/utils/schemas";
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

const SignupForm = () => {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    sigup,
    zodResolver(SignupSchema),
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
            router.push("/user/login");
          }, 1500);
        },
      },
      formProps: {
        defaultValues: {
          name: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input
                  placeholder="2文字以上30文字以内で入力してください"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  placeholder="8文字以上30文字以内で入力してください"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={action.isPending} className="">
          {action.isPending ? "作成中..." : "アカウントを作成"}
        </Button>
        <div className="text-center font-medium text-gray-900">
          すでにアカウントを持っていますか？
          <Link
            href="/user/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ログイン
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
