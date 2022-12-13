import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import partsPic from '../../assets/1e_parts.jpg'
import { FcGoogle } from 'react-icons/fc'
import Link from "next/link"
import {useState} from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

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
    const [tab, setTab] = useState<'names' | 'email'>('names')
    const nameTabControls = useAnimationControls()
    const emailTabControls = useAnimationControls()

    return (
	<div className="bg-tropical-blue-400 h-screen w-screen flex flex-col justify-center">
	    <motion.div 
		className="flex flex-row mx-auto basis-4/5 rounded-3xl bg-gray-500"
		initial={{ opacity: 0, scale: 0.5 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
	    >
		<div className="bg-neutral-50 rounded-3xl w-[30vw] p-4 z-10">
		    <Link href={'/'}>
			<h1 className="text-tropical-blue-400 font-bold">FastBuy.kz</h1>
		    </Link>
		    <AnimatePresence 
			mode="wait"
		    >
			<motion.div 
			    className="flex h-full justify-center items-center"
			>
			    {
				tab === 'names' ?
				<NamesTab tabControl={setTab}/>
				:
				<EmailTab tabControl={setTab}/>
			    }
			</motion.div>	
		    </AnimatePresence>
		</div>
	    </motion.div> 
	</div>
    )
}

const EmailTab = ({...props}) => {
    return (
	<div className="flex h-full justify-center items-center">
	    <div className="flex flex-col space-y-4 items-center justify-center">
		<div className="justify-center flex py-3 flex-col items-center">
		    <h1 className="font-medium text-3xl">Регистрация</h1> 
		    <p className="font-medium text-sm">Введите свои данные.</p>
		</div>
		<div className="justify-center flex flex-col space-y-3 w-full">
		    <TextField variant="outlined" size='small' fullWidth label='Email'/>
		    <TextField variant="outlined" size='small' fullWidth label='Пароль'/>
		</div> <div className="flex flex-col items-center">
		    <FormControlLabel
			control={<Checkbox/>}
			label='Я принимаю условия пользования'
			color="secondary"
		    />
		</div>
		<Button type='submit' variant='contained' size="small" color="secondary" className="rounded-xl capitalize font-semibold text-md bg-tropical-blue-400 p-2 w-full">Зарегистрироваться</Button>
		<p className="text-sm text-neutral-500 cursor-pointer">Уже есть аккаунт?</p>
		<FcGoogle onClick={() => signIn('google')} size={40} className='cursor-pointer'/>
	    </div>	
	</div>	
    )
}

const NamesTab = (tabControl: any) => {
    return (
	<div className="flex flex-col space-y-4 items-center basis-4/5 justify-center">
	    <div className="justify-center flex py-3 flex-col items-center">
		<h1 className="font-medium text-3xl">Регистрация</h1> 
		<p className="font-medium text-sm">Введите свои данные.</p>
	    </div>
	    <div className="justify-center flex flex-col basis-4/5 space-y-3 w-full">
		<TextField variant="outlined" size='small' fullWidth label='Имя'/>
		<TextField variant="outlined" size='small' fullWidth label='Фамилия'/>
	    </div>
	    <Button type='submit' onClick={() => tabControl('email')} variant='contained' size="small" color="secondary" className="rounded-xl capitalize font-semibold text-md bg-tropical-blue-400 p-2 w-full">Продолжить<ArrowForwardIcon/></Button>
	    <p className="text-sm text-neutral-500 cursor-pointer">Уже есть аккаунт?</p>
	    <FcGoogle onClick={() => signIn('google')} size={40} className='cursor-pointer'/>
	</div>	
    )
}

export default Registration
