import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/AppRoutes";
import "./App.css";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/caveat/400.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import { Link as RouterLink } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: RouterLink,
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: grey[200],
          opacity: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: "none",
          color: theme.palette.text.primary,
          textTransform: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }),
        contained: ({ theme }) => ({
          background: grey[200],
          gap: theme.spacing(1),
          fontWeight: 600,
        }),
      },
    },
  },
  typography: {
    fontFamily: ["Lato", "Arial", "sans-serif"].join(","),
    h1: {
      fontFamily: "Caveat, sans-serif",
      fontWeight: 400,
    },
    h2: {
      fontFamily: "Caveat, sans-serif",
      fontWeight: 400,
    },
    h3: {
      fontFamily: "Caveat, sans-serif",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "Lato, sans-serif",
      fontWeight: 400,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#f5c542",
    },
    secondary: {
      main: "#695317",
    },
  },
});

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </React.StrictMode>
    </Provider>
  );
}
