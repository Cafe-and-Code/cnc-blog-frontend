export interface IRootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export interface IHeaderOtherType {
  disabledPublish?: boolean;
  onPost?: () => void;
}

export interface IPathType {
  name: string;
  path: string;
}
