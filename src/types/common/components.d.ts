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

export interface ITabType {
  name: string;
}

export interface IToggleType {
  value: string;
  onChange: () => void;
}

export interface IUploadImageType {
  isAvatar?: boolean;
  classCustom?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ISelect {
  name: string;
  value: string;
}
