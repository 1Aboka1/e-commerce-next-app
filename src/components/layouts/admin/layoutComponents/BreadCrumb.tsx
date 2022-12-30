import { Breadcrumbs, ThemeProvider } from "@mui/material"
import Link from "next/link"
import {useRouter} from "next/router"
import {darkTheme} from "../../../../styles/themes"

const BreadCrumb = () => {
    const router = useRouter()

    return (
	<ThemeProvider theme={darkTheme}>
	    <div className="">
		<Breadcrumbs>
		    <Link href={'/admin'}>
			Главная панель	
		    </Link>
		</Breadcrumbs>
	    </div>
	</ThemeProvider>
    )
}

export default BreadCrumb
