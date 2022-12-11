import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    email: string,
    password: string,
    repeatPassword: string,
    firstName: string,
    lastName: string,
}

const Registration = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    if(status === 'authenticated') {
	router.push('/')	
    }

    const {
	register,
	handleSubmit,
	watch,
	formState: { errors },
    } = useForm<Inputs>()


    return (
	<div className="bg-tropical-blue-400 h-screen w-screen flex flex-col justify-center">
	    <div className="flex flex-row mx-auto w-[70vw] basis-4/5 rounded-2xl bg-white">
		<div className="bg-neutral-50 basis-1/2 rounded-2xl p-4">
		    <h1 className="text-tropical-blue-400 font-bold">FastBuy.kz</h1>
		    <div className="flex h-full justify-center items-center">
			<div className="flex flex-col space-y-4 items-center justify-center">
			    <div className="justify-center flex py-1 flex-col items-center">
				<h1 className="font-semibold text-3xl">Регистрация</h1> 
				<p className="font-semibold text-sm">Введите свои данные.</p>
			    </div>
			    <div className="justify-center flex flex-col space-y-3">
				<TextField variant="outlined" size='small' label='Email'/>
				<TextField variant="outlined" size='small' label='Пароль'/>
			    </div>
			    <div className="flex flex-col items-center">
				<FormControlLabel
				    control={<Checkbox/>}
				    label='Я принимаю условия пользования'
				    color="secondary"
				/>
			    </div>
			    <Button variant='contained'>Зарегистрироваться</Button>
			    <p className="text-sm text-neutral-500">Уже есть аккаунт?</p>
			</div>	
		    </div>
		</div>
		<div className="bg-gray-500 basis-1/2">
		    Something
		</div>
	    </div> 
	</div>
    )
}

	    // <button onClick={() => signIn("google")}>Sign in with Google</button> 
export default Registration
