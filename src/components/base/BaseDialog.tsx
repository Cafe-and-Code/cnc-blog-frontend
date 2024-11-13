import React, { ReactNode } from 'react';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle} from "@/components/ui/dialog"

interface DialogType {
  dialogList: {
    visible: boolean,
    message?: string,
    title: string,
    cancelBtn?: string,
    submitBtn?: string,
  }
  customClass?: string,
  children?: ReactNode;
  onCancel?: () => void,
  onSubmit?: () => void,
}
export default function BaseDialog({ dialogList, children, customClass, onCancel = () => { }, onSubmit = () => { } }: DialogType) {

  const handleCancel = () => {
    onCancel();
  }

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <Dialog open={dialogList.visible} onOpenChange={handleCancel}>
      <DialogContent className={customClass}>
        {dialogList.title && <DialogTitle className='text-[20px] font-medium break-all'>{dialogList.title}</DialogTitle>}
        {dialogList.message && <div className='break-all'>{dialogList.message}</div>}
        {children && <div className='break-all overflow-auto'>{children}</div>}
        <div className="w-full flex items-end gap-2">
          {dialogList.cancelBtn && <Button className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleCancel}>{dialogList.cancelBtn}</Button>}
          {dialogList.submitBtn && <Button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>{dialogList.submitBtn}</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}