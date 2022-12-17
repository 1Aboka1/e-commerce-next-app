import { signIn, signOut, useSession } from "next-auth/react"
import {useRouter} from "next/router"

const Home = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
	<div>
	    {
		status === 'unauthenticated' ?
		<button onClick={() => router.push('/auth/registration')}>Sign in/up</button>
		:
		<button onClick={() => signOut()}>Sign out</button> 
	    }
	</div>
    )
}

export default Home
