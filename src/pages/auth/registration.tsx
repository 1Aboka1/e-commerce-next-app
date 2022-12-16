import {Button, Checkbox, FormControlLabel, InputAdornment, TextField} from "@mui/material"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { FcGoogle } from 'react-icons/fc'
import Link from "next/link"
import {useEffect, useState} from "react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDisclosure } from "@chakra-ui/react"
import {VisibilityOutlined} from "@mui/icons-material"
import bcrypt from 'bcrypt'
import { prisma } from "../../server/db/client"

type Inputs = {
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string,
    checkbox: boolean,
}

const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
const passwordRegex = new RegExp(/(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/)
const validationSchema = yup.object({
    email: yup.string().required('Укажите почту')
	.matches(emailRegex, 'Введите почту'),
    password: yup.string().required('Укажите пароль')
	.min(8, 'Пароль должен быть длиной в 8-12 символов')
	.max(20, 'Пароль должен быть длиной в 8-12 символов')
	.matches(passwordRegex, 'Пароль должен состоять из: 1 заглавной буквы, 1 цифры и 1 специального символа'),
    passwordConfirmation: yup
	.string()
	.required('Повторите пароль')
	.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
    firstName: yup.string().required('Укажите имя')
	.min(3, 'Имя должно быть длиной в 3-25 символов')
	.max(25, 'Имя должно быть длиной в 3-25 символов'),
    lastName: yup.string().required('Укажите фамилию')
	.min(3, 'Фамилия должна быть длиной в 3-25 символов')
	.max(25, 'Фамилия должна быть длиной в 3-25 символов'),
    checkbox: yup.boolean().required().isTrue(),
})

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
	getValues,
	clearErrors,
	formState: { errors },
    } = useForm<Inputs>({
	resolver: yupResolver(validationSchema)
    })
    const { isOpen, onToggle, onClose } = useDisclosure()
    const onFormSubmit = handleSubmit((data) => {
	console.log(data)
	// bcrypt.hash(data.password, 10, function(err, hash) {
	//     prisma.user.create({
	// 	data: {
	// 	    email: data.email,
	// 	    name: data.firstName + data.lastName,
	// 	    password: hash,
	// 	}
	//     })    
	//     signIn('credentials', { email: data.email, password: data.password, callbackUrl: `${window.location.origin}/dashboard`, redirect: false })
	//     .then((result) => {
	// 	if(result?.error) {
	// 	    console.log(result?.status)
	// 	} else {
	// 	    console.log(result?.url)
	// 	}
	//     })
	// })
    })
    
    const [tab, setTab] = useState<'names' | 'email'>('names')

    return (
	<div className="bg-tropical-blue-400 h-screen w-screen flex flex-col justify-center">
	    <motion.div 
		className="flex flex-row mx-auto basis-3/5 lg:basis-4/5 rounded-3xl bg-gray-500"
		initial={{ opacity: 0, scale: 0.5 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
	    >
		<form className="bg-neutral-50 rounded-3xl w-[95vw] md:w-[60vw] lg:w-[30vw] p-4 z-10" onSubmit={onFormSubmit}>
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
				    formSubmitHandler={onFormSubmit}
				    getValues={getValues}
				    clearErrors={clearErrors}
				/>
				:
				<EmailTab 
				    tabControl={setTab} 
				    formControl={register}
				    errors={errors}
				    clearErrors={clearErrors}
				/>
			    }
			</motion.div>	
		    </AnimatePresence>
		</form>
	    </motion.div> 
	</div>
    )
}

const NamesTab = ({ tabControl, formControl, formSubmitHandler, getValues, errors, clearErrors }: any) => {
    const switchToNextTab = () => {
	if(getValues('firstName').length === 0 || getValues('lastName').length === 0 ) {
	    clearErrors()
	    return
	}
	tabControl('email')
    }

    return (
	<div className="flex flex-col space-y-4 items-center justify-center">
		<div className="justify-center flex py-3 flex-col flex-nowrap items-center">
		<h1 className="font-medium text-3xl">Регистрация</h1> 
		<p className="font-medium text-sm">Введите свои данные.</p>
	    </div>
	    <div className="justify-center flex flex-col items-start basis-4/5 space-y-3 lg:w-80">
		<TextField 
		    {...formControl('firstName', { required: true })} 
		    variant="outlined" 
		    size='small' 
		    fullWidth 
		    label='Имя'
		    color={errors.firstName && 'error'}
		/>
		<FieldError error={errors.firstName}/>
		<TextField 
		    {...formControl('lastName', { required: true })} 
		    variant="outlined" 
		    size='small' 
		    key={errors.lastName}
		    fullWidth 
		    label='Фамилия'
		    color={errors.lastName && 'error'}
		/>
		<FieldError error={errors.lastName}/>
	    </div>
	    <Button 
		onClick={() => { switchToNextTab(); formSubmitHandler; }}
		variant='contained' 
		size="small" 
		color="secondary" 
		className="rounded-xl capitalize font-semibold text-md bg-tropical-blue-400 p-2 w-full"
		type='submit'
	    >
		Продолжить<ArrowForwardIcon/>
	    </Button> 
	    <p className="text-sm text-neutral-500 cursor-pointer">Уже есть аккаунт?</p>
	    <FcGoogle onClick={() => signIn('google')} size={40} className='cursor-pointer'/>
	</div>	
    )
}

const EmailTab = ({ tabControl, formControl, errors, clearErrors }: any) => {
    useEffect(() => {
	clearErrors()
    }, [])

    const [showPassword, setShowPassword] = useState(false)

    return (
	<div className="flex justify-center items-center flex-nowrap">
	    <div className="flex flex-col space-y-4 items-center justify-center flex-nowrap">
		<div className="flex flex-col items-start justify-start w-full">
	    <Button type='submit' onClick={() => tabControl('names')} variant='text' size="small" color="secondary" className="rounded-xl w-full capitalize font-semibold text-md text-neutral-600 p-2"><ArrowBackIcon/>Назад</Button> 
		</div>
		<div className="justify-center flex flex-col items-start flex-nowrap space-y-3 lg:w-80">
		    <TextField 
			{...formControl('email', { required: true })} 
			variant="outlined" 
			size='small' 
			fullWidth 
			label='Email'
			color={errors.email && 'error'}
		    />
		    <FieldError error={errors.email}/>
		    <TextField 
			{...formControl('password', { required: true })} 
			type={showPassword ? 'text' : 'password'}
			variant="outlined" 
			size='small' 
			fullWidth 
			label='Пароль'
			color={errors.password && 'error'}
			InputProps={{
			    endAdornment: (
				<InputAdornment position='end'>
				    <VisibilityOutlined className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}/>
				</InputAdornment>
			    )
			}}
		    />
		    <FieldError error={errors.password}/>
		    <TextField 
			{...formControl('passwordConfirmation', { required: true })} 
			type={showPassword ? 'text' : 'password'}
			variant="outlined" 
			size='small' 
			fullWidth 
			label='Повторите пароль'
			color={errors.passwordConfirmation && 'error'}
		    />
		    <FieldError error={errors.passwordConfirmation}/>
		</div> 
		<div className="flex flex-col items-center">
		    <FormControlLabel
			control={<Checkbox color={errors.checkbox && 'error'}/>}
			label='Я принимаю условия пользования'
			{...formControl('checkbox', { required: true })}
			className={errors.checkbox && 'text-red-600'}
		    />
		</div>
		<Button type='submit' variant='contained' size="small" color="secondary" className="rounded-xl capitalize font-semibold text-md bg-tropical-blue-400 p-2 w-full">Зарегистрироваться</Button>
	    </div>	
	</div>	
    )
}

const FieldError = ({ error }: any) => {
    if(error) {
	return (
	    <AnimatePresence
		mode='wait'
	    >
		<motion.div 
		    className="text-red-600 text-sm"
		    key={error?.message}
		    initial={{ y: 10, opacity: 0 }}
		    animate={{ y: 0, opacity: 1 }}
		    exit={{ y: -10, opacity: 0 }}
		    transition={{ duration: 0.3 }}
		>
		    {error?.message}
		</motion.div>
	    </AnimatePresence>
	)
    } else {
	return null
    }
}

export default Registration
