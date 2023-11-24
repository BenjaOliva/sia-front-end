import { Outlet, RouteObject } from "react-router-dom";
import { Home } from "../views/home/home.view";
import { Results } from "../views/results/results.view";
import { Box } from "@chakra-ui/react";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Box p={5} borderWidth={2} rounded={"lg"} borderColor={"gray"} m={2}>
        <Outlet />
      </Box>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "results",
        element: <Results />,
      },
    ],
  },
];
