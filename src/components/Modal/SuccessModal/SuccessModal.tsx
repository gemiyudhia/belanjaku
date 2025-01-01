"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ onClose, open }: SuccessModalProps) => {
  const { push } = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            Pendaftaran Berhasil
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-center text-lg text-gray-500">
            Akun Anda berhasil dibuat. Silakan cek email anda untuk verifikasi.
          </p>
        </div>
        <DialogFooter className="mt-5">
          <Button
            onClick={() => {
              push("/login");
              onClose();
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center hover:text-white"
          >
            Login Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
