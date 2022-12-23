import type { AppProps, AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import {theme} from "../styles/themes";
import type {NextPage} from "next";
import type {ReactElement, ReactNode} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
    const getLayout = Component.getLayout || ((page: ReactNode) => page)

    return (
	<ChakraProvider>
	    <ThemeProvider theme={theme}>
		<SessionProvider session={session}>
		    <NextNProgress/>
		    {getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	    </ThemeProvider>
	</ChakraProvider>
  )
}

export default trpc.withTRPC(MyApp);
