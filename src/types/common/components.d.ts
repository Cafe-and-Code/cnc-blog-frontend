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

export interface INewDialogType {
  dialogList: {
    visible: boolean;
    message?: string;
    title: string;
    cancelBtn?: string;
    submitBtn?: string;
    onCancel: () => void;
    onSubmit: () => void;
  };
  customClass?: string;
  children?: ReactNode;
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
  onChange?: (event: string) => void;
}

export interface ISelect {
  name: string;
  value: string;
}

export interface ToggleType {
  value: string;
  onChange: () => void;
}
