import {Button, InputAdornment, TextField, ThemeProvider} from "@mui/material"
import {type ReactNode} from "react"
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import {useRouter} from "next/router"
import {useSession} from "next-auth/react"
import {IconContext} from "react-icons"
import {darkTheme} from "../../../../styles/themes"

const Navbar = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const firstName = session?.user?.name?.substring(0, session?.user.name.indexOf(' '))

    return (
	<ThemeProvider theme={darkTheme}>
	    <div className="shadow-md sticky top-0 bg-special-slate-component z-50">
		<div className="bg-special-slate-component mx-auto p-1 px-5 space-y-2">
		    <div className="flex flex-row items-center justify-between space-x-3">
			<div className="flex flex-row space-x-4 items-center justify-between w-full">
			    <TextField 
				variant="outlined" 
				size='small' 
				placeholder="Поиск по сайту"
				className="w-96"
				InputProps={{
				    endAdornment: (
					<InputAdornment position="end">
					    <BsSearch size={18}/>
					</InputAdornment>
				    )
				}}
			    />
			    <div className="flex flex-row space-x-5 items-center">
				<Button onClick={() => router.push('/admin/products/edit_product')} variant='contained' className='bg-tropical-blue-500 rounded-xl text-white font-semibold normal-case'><AiOutlinePlus className="mr-2 font-semibold" size={20}/>Добавить продукт</Button>
				<BsFillGridFill color="white" size={18} className='cursor-pointer'/>	
				<IoIosNotifications color="white" size={22} className='cursor-pointer'/>	
				{
				    session ?
				    (
					<div
					    className="group flex"
					>
					    <ButtonWithIconOnBottom
						text={firstName}
						icon={<AiOutlineUser size={25}/>}
						bold
					    />
					</div>
				    ) :
				    (
					<div
					    onClick={() => router.push('/auth/login')}
					    className='group'
					>
					    <ButtonWithIconOnBottom
						text='Войти'
						icon={<AiOutlineUser size={25}/>}
					    />
					</div>
				    )
				}
			    </div>
			</div>
		    </div>
		</div>
	    </div>
	</ThemeProvider>
    )
}

const ButtonWithIconOnBottom = ({ text, icon, bold }: { text?: string, icon: ReactNode, bold?: boolean }) => {
    return (
	<IconContext.Provider value={{ color: '#ffffff', className: "" }}>
	    <div className="flex flex-col items-center cursor-pointer">
		<div className="">
		    {icon}
		</div>
		<span className={"group-hover:text-white text-gray-300 transition duration-300 ease-in-out " + (bold ? "font-semibold" : '')}>
		    {text}
		</span>
	    </div>
	</IconContext.Provider>
    )
}

export default Navbar
