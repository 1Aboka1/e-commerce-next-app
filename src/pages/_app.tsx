import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import {theme} from "../styles/themes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
  <ChakraProvider>
    <ThemeProvider theme={theme}>
	<SessionProvider session={session}>
	    <NextNProgress/>
	    <Component {...pageProps} />
	</SessionProvider>
    </ThemeProvider>

  </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
