import Image from "next/image";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="lg:grid lg:grid-cols-2 w-full lg:mx-32">
        <div className="flex-1 p-8 lg:p-16 flex flex-col justify-between">
          <div className="w-full max-w-md mx-auto">{children}</div>
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
    </div>
  );
};

export default AuthLayout;
