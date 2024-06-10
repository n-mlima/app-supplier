import { createBrowserRouter } from 'react-router-dom';
import Login from './componets/Login';
import DashboardLayout from "./componets/Dashboard";
import Supplier from "./componets/Supplier";
import SupplierList from "./componets/SupplierList";

import ProtectedRoute from './componets/ProtectedRoute';
import UserSettings from './componets/UserSettings';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        {
          path: "/add-supplier",
          element: <Supplier />
        },
        {
          path: "/list-supplier",
          element: <SupplierList />
        },
        {
          path:"/user-settings",
          element:<UserSettings/>
        }
      ]
    },
    {
      path: "*",
      element: <div>404 Not Found</div>
    }
  ]);

  return router;
}

export default Router;
