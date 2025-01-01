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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/Modal/SuccessModal/SuccessModal";
import ErrorModal from "@/components/Modal/ErrorModal/ErrorModal";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(5, "Email tidak valid.").max(50),
  password: z
    .string()
    .min(8, {
      message: "Password harus 8 karakter.",
    })
    .min(1, {
      message: "Password tidak boleh kosong.",
    }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [emailVerified, setEmailVerifies] = useState<boolean>(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        form.reset();
        setLoading(false);
        setEmailVerifies(true);
        setTimeout(() => {
          push("/");
        }, 4000);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Masuk</h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang di{" "}
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
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOutline className="text-2xl opacity-75" />
                      ) : (
                        <IoEyeOffOutline className="text-2xl opacity-75" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <Button
              disabled
              className="w-full text-white font-semibold bg-primary opacity-75"
            >
              <Loader2 className="animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full text-white font-semibold bg-primary hover:bg-primary-hover"
            >
              Masuk
            </Button>
          )}
        </form>
      </Form>

      <div className="text-center text-sm">
        Belum punya akun?{" "}
        <Link href="/register" className="text-blue-600">
          Daftar
        </Link>
      </div>

      {/* Success modal */}
      <SuccessModal
        open={emailVerified}
        onClose={() => setEmailVerifies(false)}
        modalText="Anda telah berhasil masuk ke akun anda. Mohon tunggu sebentar"
        modalTitle="Login Berhasil"
      />

      {/* Error modal */}
      <ErrorModal
        open={error}
        onClose={() => setError(false)}
        modalText=" Silakan verifikasi email Anda untuk melanjutkan. Cek kotak masuk email Anda untuk tautan verifikasi."
        modalTitle="Verifikasi Email Diperlukan"
        buttonText="Tutup"
      />
    </div>
  );
}
