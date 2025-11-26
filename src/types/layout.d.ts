export interface IRootLayoutProps {
  children: React.ReactNode;
}

export interface IHeaderOtherType {
  disabledPublish?: boolean;
  onPost?: () => void;
}

export interface IPathType {
  name: string;
  path: string;
}
