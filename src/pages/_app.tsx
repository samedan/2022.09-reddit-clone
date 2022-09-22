import type { AppProps } from "next/app";
import React, { useEffect } from "react";

import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

import { Amplify, Auth } from "aws-amplify";
import awsmobile from "../aws-exports";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
Amplify.configure({ ...awsmobile, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <React.Fragment>
      <Head>
        <title>Reddit Clone</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthContext>
        <ThemeProvider theme={theme}>
          <Header />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthContext>
    </React.Fragment>
  );
}

export default MyApp;
