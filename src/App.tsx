import "./App.css";
import { ChakraProvider, Text } from "@chakra-ui/react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { routes } from "./config/routes";
import theme from "./theme/theme";

const router = createBrowserRouter([
  ...routes,
  {
    // Fallback route - No Match redirect to landing ( " / " )
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);

function App() {
  return (
    <div style={{ WebkitTapHighlightColor: "transparent" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
