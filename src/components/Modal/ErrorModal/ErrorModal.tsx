"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  modalTitle: string;
  modalText: string;
  buttonText?: string;
  onClose: () => void;
}

const ErrorModal = ({ open, onClose, modalText, modalTitle, buttonText }: ErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <p className="text-center text-gray-500 text-lg">
            {modalText}
          </p>
        </div>
        <DialogFooter className="mt-5 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full py-2 px-4 rounded-lg transition duration-150 bg-red-600 hover:bg-red-700 ease-in-out text-white font-semibold hover:text-white"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
