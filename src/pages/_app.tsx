import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakraTheme/Theme";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </Provider>
  );
}
