"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { sigup } from "@/app/actions/signup";
import { SignupSchema } from "@/app/utils/SignupSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/app/components/Input";
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
import { da } from "zod/v4/locales";

const SignupForm = () => {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    sigup,
    zodResolver(SignupSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (data === null) return;
          console.log("Toast発動");
          console.log({ data });
          toast(data.message);
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

  // return (
  //   <form onSubmit={handleSubmitWithAction} className="mt-8 space-y-6">
  //     <div className="rounded-md -space-y-px">
  //       <div>
  //         <label htmlFor="name">名前</label>
  //         <Input
  //           id="name"
  //           name="name"
  //           type="text"
  //           required={true}
  //           placeholder="名前"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="email">メールアドレス</label>
  //         <Input
  //           id="email"
  //           name="email"
  //           type="text"
  //           required={true}
  //           placeholder="メールアドレス"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="password">パスワード</label>
  //         <Input
  //           id="password"
  //           name="password"
  //           type="password"
  //           required={true}
  //           placeholder="パスワード"
  //         />
  //       </div>
  //     </div>

  //     <div>
  //       <Button>アカウントを作成</Button>
  //     </div>
  //     <div className="text-center font-medium text-gray-900">
  //       すでにアカウントをお持ちですか？
  //       <Link
  //         href="/user/login"
  //         className="font-medium text-indigo-600 hover:text-indigo-500"
  //       >
  //         ログイン
  //       </Link>
  //     </div>
  //   </form>
  // );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder="なまえを入力してください" {...field} />
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
                <Input
                  placeholder="メールアドレスを入力してください"
                  {...field}
                />
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
                <Input placeholder="パスワードを入力してください" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={action.isPending}>
          {action.isPending ? "作成中..." : "アカウントを作成"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
