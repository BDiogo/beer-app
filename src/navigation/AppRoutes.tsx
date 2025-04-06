import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../Layout";
import { BeerList } from "../beer/BeerList";
import { BeerMap } from "../beer/BeerMap";
import { BeerDetails } from "../beer/BeerDetails";
import { BeerAdd } from "../beer/BeerAdd";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/list" replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "list",
        element: <BeerList />,
      },
      {
        path: "list/:id",
        element: <BeerDetails />,
      },
      {
        path: "list/add",
        element: <BeerAdd />,
      },
      {
        path: "map",
        element: <BeerMap />,
      },
    ],
  },
]);
