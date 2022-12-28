import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import {useRouter} from "next/router"
import type {ReactElement} from "react"
import CarouselAndFeatured from "../components/home/CarouselAndFeatured"
import Footer from "../components/layouts/home/layoutComponents/Footer"
import Navbar, {TopBar} from "../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../components/layouts/home/MainLayout"
// eslint-disable-next-line 
// @ts-ignore
import { CldImage} from 'next-cloudinary'

const Home = () => { 
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
	<div>
	    <Head>
		<title>Fastbuy - магазин запчастей</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
	    </Head>
	    <CarouselAndFeatured/>
	    <button onClick={() => signOut()}>out</button>
	    <CldImage
	      width="960"
	      height="600"
	      src="samples/animals/kitten-playing.gif"
	      sizes="100vw"
	    />
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
