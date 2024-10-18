import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"


interface DialogProps {
  visible: boolean,
  message: string,
  title: string,
  cancelBtn?: string,
  submitBtn?: string,
  onCancel?: () => void,
  onSubmit?: () => void,
}
export default function BaseDialog({ message, visible, title, cancelBtn, submitBtn, onCancel = () => {}, onSubmit = () => {} }: DialogProps) {
  
  const handleCancel = () => {
    onCancel();
  }

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <Dialog open={visible} onOpenChange={handleCancel}>
      <DialogContent>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>{message}</DialogDescription>
        <div className="w-full flex items-center gap-2">
          {cancelBtn && <Button className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleCancel}>{cancelBtn}</Button>}
          {submitBtn && <Button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>{submitBtn}</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}