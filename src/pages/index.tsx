import { signIn, signOut, useSession } from "next-auth/react"
import {useRouter} from "next/router"
import {ReactElement} from "react"
import Footer from "../components/Footer"
import Navbar, {TopBar} from "../components/Navbar"

const Home = () => { 
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
	<div className="">
	</div>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <TopBar/>
	    <Navbar/>
	    {page}
	    <Footer/>
	</>
    )
}
 
export default Home
