import LoginForm from "@/components/Form/LoginForm/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="lg:grid lg:grid-cols-2 w-full lg:mx-32">
      <div className="flex-1 p-8 lg:p-16 flex flex-col justify-between">
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
        <div className="text-center text-sm text-muted-foreground pt-8">
          © 2024 BelanjaKu, All rights reserved
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
        <Image
          src="/images/logo.png"
          alt="Logo BelanjaKu"
          width={500}
          height={500}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
}
