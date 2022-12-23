import { signIn, signOut, useSession } from "next-auth/react"
import {useRouter} from "next/router"
import {ReactElement} from "react"
import CarouselAndFeatured from "../components/homePageComponents/CarouselAndFeatured"
import Footer from "../components/layouts/layoutComponents/Footer"
import Navbar, {TopBar} from "../components/layouts/layoutComponents/Navbar"
import MainLayout from "../components/layouts/MainLayout"

const Home = () => { 
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
	<div>
	    <button onClick={() => signOut()}>out</button>
	    <CarouselAndFeatured/>
	</div>	
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <TopBar/>
	    <Navbar/>
	    <MainLayout>
		{page}
	    </MainLayout>
	    <Footer/>
	</>
    )
}
 
export default Home
