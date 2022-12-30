import type {ReactElement} from "react"
import { ThemeProvider } from "@mui/material"
import { darkTheme } from "../../../styles/themes"
import Navbar from "./layoutComponents/Navbar"
import Sidebar from "./layoutComponents/Sidebar"

const MainLayout = ({ children }: {children: ReactElement}) => {
    return (
	<ThemeProvider theme={darkTheme}>
	    <div className="flex flex-row bg-black">
		<Sidebar/>
		<div className="flex flex-col grow">
		    <Navbar/>
		    <div className="bg-black space-y-3 lg:w-[1050px] lg:mt-5 mx-auto">
			{children} 
		    </div>
		</div>
	    </div>
	</ThemeProvider>
    )
}

export default MainLayout
