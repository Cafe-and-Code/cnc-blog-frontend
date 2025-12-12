import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

import { INewDialogType } from '@/types/common/components';

export default function BaseDialog({
  dialogList,
  children,
  customClass,
}: INewDialogType) {
  return (
    <Dialog
      open={dialogList.visible}
      onOpenChange={() => dialogList.onCancel()}
    >
      <DialogContent className={customClass}>
        {dialogList.title && (
          <DialogTitle className="whitespace-pre-line text-[20px] font-medium">
            {dialogList.title}
          </DialogTitle>
        )}
        <DialogDescription className="hidden"></DialogDescription>
        {dialogList.message && (
          <div className="whitespace-pre-line">{dialogList.message}</div>
        )}
        {children && (
          <div className="overflow-auto whitespace-pre-line">{children}</div>
        )}
        <div className="flex w-full items-end gap-2">
          {dialogList.cancelBtn && (
            <Button
              className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => dialogList.onCancel()}
            >
              {dialogList.cancelBtn}
            </Button>
          )}
          {dialogList.submitBtn && (
            <Button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => dialogList.onSubmit()}
            >
              {dialogList.submitBtn}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
