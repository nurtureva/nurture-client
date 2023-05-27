import { RouteObject } from 'react-router-dom';

export * from './features/Provider/types';

export type Endpoint = RouteObject & {
  name: string;
  path: string;
};

export interface EndpointPropWrapper {
  navRoutes: Endpoint[];
}

export interface ContentObject {
  title?: string;
  Header?: React.FC<{}>;
  Content?: React.FC<ContentObject | {}>;
  className?: string;
  description?: string;
  updateState?: Function;
}

export interface ZipCode {
  zip_code: string;
  distance: number;
  city: string;
  state: string;
}

export type Reports = any;
