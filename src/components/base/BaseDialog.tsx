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
  cancelBtn: string,
  submitBtn: string,
}
export default function BaseDialog({ message, visible, title, cancelBtn, submitBtn }: DialogProps) {
  return (
    <Dialog open={visible}>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div>
          {cancelBtn && <Button>{cancelBtn}</Button>}
          {submitBtn && <Button>{submitBtn}</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}