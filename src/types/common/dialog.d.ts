export interface IDialogType {
  dialogList: {
    visible: boolean;
    message?: string;
    title: string;
    cancelBtn?: string;
    submitBtn?: string;
  };
  customClass?: string;
  children?: ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
}
