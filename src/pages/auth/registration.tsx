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
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

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
	setValue,
	handleSubmit,
	formState: { errors },
    } = useForm<Inputs>()
    const onFormSubmit = handleSubmit((data) => {
	console.log(data)
    })
    
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
		<form className="bg-neutral-50 rounded-3xl w-[30vw] p-4 z-10" onSubmit={onFormSubmit}>
		    <Link href={'/'}>
			<h1 className="text-tropical-blue-400 font-bold">FastBuy.kz</h1>
		    </Link>
		    <AnimatePresence 
			mode="wait"
		    >
			<motion.div 
			    className="flex h-full justify-center items-center"
			    key={tab}
			    initial={{ x: 10, opacity: 0 }}
			    animate={{ x: 0, opacity: 1 }}
			    exit={{ x: -10, opacity: 0 }}
			    transition={{ duration: 0.2 }}
			>
			    {
				tab === 'names' ?
				<NamesTab 
				    tabControl={setTab} 
				    formControl={register}
				    errors={errors}
				/>
				:
				<EmailTab 
				    tabControl={setTab} 
				    formControl={register}
				    errors={errors}
				/>
			    }
			</motion.div>	
		    </AnimatePresence>
		</form>
	    </motion.div> 
	</div>
    )
}

const EmailTab = ({ tabControl, formControl, errors }: any) => {
    return (
	<div className="flex justify-center items-center">
	    <div className="flex flex-col space-y-4 items-center justify-center">
		<div className="flex flex-col items-start justify-start w-full">
	    <Button type='submit' onClick={() => tabControl('names')} variant='text' size="small" color="secondary" className="rounded-xl w-full capitalize font-semibold text-md text-neutral-600 p-2"><ArrowBackIcon/>Назад</Button> 
		</div>
		<div className="justify-center flex flex-col space-y-3 w-full">
		    <TextField 
			{...formControl('email')} 
			variant="outlined" 
			size='small' 
			fullWidth 
			label='Email'
			color={errors.email && 'error'}
		    />
		    <TextField 
			{...formControl('password', { required: true })} 
			type='password' 
			variant="outlined" 
			size='small' 
			fullWidth 
			label='Пароль'
			color={errors.password && 'error'}
		    />
		    <TextField 
			{...formControl('repeatPassword', { required: true })} 
			type='password' 
			variant="outlined" 
			size='small' 
			fullWidth 
			label='Повторите пароль'
			color={errors.repeatPassword && 'error'}
		    />
		</div> 
		<div className="flex flex-col items-center">
		    <FormControlLabel
			control={<Checkbox/>}
			label='Я принимаю условия пользования'
			color="secondary"
		    />
		</div>
		<Button type='submit' variant='contained' size="small" color="secondary" className="rounded-xl capitalize font-semibold text-md bg-tropical-blue-400 p-2 w-full">Зарегистрироваться</Button>
	    </div>	
	</div>	
    )
}

const NamesTab = ({ tabControl, formControl }: any) => {
    return (
	<div className="flex flex-col space-y-4 items-center basis-4/5 justify-center">
	    <div className="justify-center flex py-3 flex-col items-center">
		<h1 className="font-medium text-3xl">Регистрация</h1> 
		<p className="font-medium text-sm">Введите свои данные.</p>
	    </div>
	    <div className="justify-center flex flex-col basis-4/5 space-y-3 w-full">
		<TextField {...formControl('firstName', { required: true })} variant="outlined" size='small' fullWidth label='Имя'/>
		<TextField {...formControl('lastName', { required: true })} variant="outlined" size='small' fullWidth label='Фамилия'/>
	    </div>
	    <Button onClick={() => tabControl('email')} variant='contained' size="small" color="secondary" className="rounded-xl capitalize font-semibold text-md bg-tropical-blue-400 p-2 w-full">Продолжить<ArrowForwardIcon/></Button> 
	    <p className="text-sm text-neutral-500 cursor-pointer">Уже есть аккаунт?</p>
	    <FcGoogle onClick={() => signIn('google')} size={40} className='cursor-pointer'/>
	</div>	
    )
}

export default Registration
