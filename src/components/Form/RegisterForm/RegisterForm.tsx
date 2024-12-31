"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const formSchema = z
  .object({
    email: z.string().min(5, "Email tidak valid.").max(50),
    password: z
      .string()
      .min(8, {
        message: "Password harus 8 karakter.",
      })
      .min(1, {
        message: "Password tidak boleh kosong.",
      }),
    confirmPassword: z
      .string()
      .min(1, {
        message: "Password tidak boleh kosong.",
      })
      .min(8, {
        message: "Password harus 8 karakter.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama.",
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Daftar</h1>
        <p className="text-sm text-muted-foreground">
          Silahkan daftar untuk menggunakan{" "}
          <span className="text-primary font-semibold italic">BelanjaKu</span>
        </p>
      </div>

      <div>
        <Button variant="outline" className="w-full p-4">
          <FcGoogle />
          Masuk dengan Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukan email anda..."
                    type="email"
                    className="focus:ring-2 focus:ring-primary focus:outline-none"
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Masukan password anda..."
                      type={showPassword ? "text" : "password"}
                      className="focus:ring-2 focus:ring-primary focus:outline-none"
                      {...field}
                    />
                    <div>
                      {showPassword ? (
                        <IoEyeOutline
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl opacity-70 cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <IoEyeOffOutline
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl opacity-70 cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Konfirmasi Password</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Konfirmasi password anda..."
                      type={showConfirmPassword ? "text" : "password"}
                      className="focus:ring-2 focus:ring-primary focus:outline-none"
                      {...field}
                    />
                    <div>
                      {showConfirmPassword ? (
                        <IoEyeOutline
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl opacity-70 cursor-pointer"
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      ) : (
                        <IoEyeOffOutline
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl opacity-70 cursor-pointer"
                          onClick={() => setShowConfirmPassword(true)}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-white font-semibold bg-primary hover:bg-primary-hover"
          >
            Daftar
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-blue-600">
          Masuk
        </Link>
      </div>
    </div>
  );
}
