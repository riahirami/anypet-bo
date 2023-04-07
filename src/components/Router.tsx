import { useRoutes } from 'react-router-dom';
import RoutesConfig from '../routes/routes.config';

export function Router() {
  return useRoutes(RoutesConfig);
}

export default Router;