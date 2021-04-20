import React from "react";
import Loadable from "react-loadable";
import Loading from "../components/Loading";
import Configpage from "../configPage";

// templates
const Home = Loadable({
  loader: () => import("../pages/home"),
  loading: () => <Loading />,
});

const NotFound = Loadable({
  loader: () => import("../pages/404"),
  loading: () => <Loading />,
});

import routes, { HOME } from "./routes";

export default [
  {
    path: "/",
    component: Configpage,
    exact: false,
    routes: [
      {
        paths: routes[HOME],
        component: Home,
        exact: true,
        loadData: () => async () => {
          console.log("datos cargados en ssr antes de mostrar en cliente");
        },
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];
