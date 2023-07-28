import { ChakraProvider, ColorModeScript, Spinner } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import './css/style.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LandingLayout = React.lazy(
  () => import("./components/landing/LandingLayout")
);

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <React.Suspense fallback={<Spinner />}>
          <Routes>
            <Route path={"/*"} element={<LandingLayout />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
