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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import SuccessModal from "@/components/Modal/SuccessModal/SuccessModal";
import ErrorModal from "@/components/Modal/ErrorModal/ErrorModal";
import { signIn } from "next-auth/react";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const res = await fetch("./api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.ok) {
        form.reset();
        setLoading(false);
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

    if (res.ok) {
      form.reset();
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        push("/login");
      }, 5000);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  const handleGoogleLogin = async () => {
    await signIn("google", { redirect: false, callbackUrl: "/" });
  };

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
        <Button
          type="submit"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full p-4"
        >
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
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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
              Daftar
            </Button>
          )}
        </form>
      </Form>

      <div className="text-center text-sm">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Masuk
        </Link>
      </div>

      {/* Success Modal */}
      <SuccessModal
        open={success}
        onClose={() => setSuccess(false)}
        modalText="Pendaftaran Berhasil"
        modalTitle="Akun Anda berhasil dibuat. Silakan cek email anda untuk verifikasi"
        buttonText="Login Sekarang"
      />

      {/* Error Modal */}
      <ErrorModal
        open={error}
        onClose={() => setError(false)}
        modalTitle="Pendaftaran Gagal"
        modalText="Mohon maaf, terjadi kesalahan saat proses pendaftaran atau akun anda
            sudah terdaftar."
        buttonText="Tutup"
      />
    </div>
  );
}
