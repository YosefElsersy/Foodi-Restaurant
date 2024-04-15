import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import Order from "../pages/dashboard/Order";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../pages/dashboard/UserProfile";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import MangageOrders from "../pages/dashboard/admin/MangageOrders";
import ErrorPage from "../components/ErrorPage.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <Home/>,
            errorElement: <ErrorPage />
        },
        {
          path: "/menu",
          element: <Menu/>,
          errorElement: <ErrorPage />
        },
        {
          path: "/order",
          element:<PrivateRoute><Order/></PrivateRoute>,
          errorElement: <ErrorPage />
        },
        {
          path: "/update-profile",
          element: <UserProfile/>,
          errorElement: <ErrorPage />
        },
        {
          path: "/cart-page",
          element: <CartPage/>,
          errorElement: <ErrorPage />
        },
        {
          path:"/process-checkout",
          element:<Payment/>,
          errorElement: <ErrorPage />
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorPage />
    },
    // admin routes
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Dashboard/>,
          errorElement: <ErrorPage />
        },
        {
          path: 'manage-orders', 
          element: <MangageOrders/>,
          errorElement: <ErrorPage />
        },
        {
          path: 'users', 
          element: <Users/>,
          errorElement: <ErrorPage />
        },
        {
          path: 'add-menu',
          element: <AddMenu/>,
          errorElement: <ErrorPage />
        }, 
        {
          path: "manage-items",
          element: <ManageItems/>,
          errorElement: <ErrorPage />
        },
        {
          path: "update-menu/:id",
          element: <UpdateMenu/>,
          errorElement: <ErrorPage />,
          loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
        }
      ]
    }
  ]);

  export default router;