import { Breadcrumbs, ThemeProvider } from "@mui/material"
import Link from "next/link"
import type {ReactElement} from "react"
import {darkTheme} from "../../../../styles/themes"

const BreadCrumb = ({ links }: { links: any }) => {
    return (
	<ThemeProvider theme={darkTheme}>
	    <div className="">
		<Breadcrumbs>
		    <Link href={'/admin'}>
			Главная панель	
		    </Link>
		    {links}
		</Breadcrumbs>
	    </div>
	</ThemeProvider>
    )
}

export default BreadCrumb
