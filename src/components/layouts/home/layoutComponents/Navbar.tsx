import {InputAdornment, TextField} from "@mui/material"
import Image from "next/image"
import Logo from '../../../../../public/favicon.png'
import {type ReactNode} from "react"
import { AiOutlineUser } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { TfiMenuAlt } from 'react-icons/tfi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { BiMap } from 'react-icons/bi'
import {useRouter} from "next/router"
import {useSession} from "next-auth/react"
import {IconContext} from "react-icons"

const Navbar = () => {
    const router = useRouter()
    const { data: session} = useSession()
    const firstName = session?.user?.name?.substring(0, session?.user.name.indexOf(' '))

    return (
	<div className="border-b-2 shadow-md sticky top-0 bg-white z-50">
	    <div className="bg-white lg:w-[1200px] mx-auto p-2 space-y-2">
		<div className="flex flex-row items-center justify-between space-x-3">
		    <Image 
			src={Logo} 
			alt='Logo' 
			width={80} 
			height={20}
		    />
		    <div className="flex flex-row space-x-2 text-white items-center bg-tropical-blue-400 p-3 px-4 rounded-xl cursor-pointer">
			<TfiMenuAlt size={20}/>	
			<span className="uppercase text-sm font-semibold">Каталог</span>
		    </div>
		    <TextField 
			variant="outlined" 
			size='medium' 
			fullWidth 
			placeholder="Поиск по сайту"
			InputProps={{
			    endAdornment: (
				<InputAdornment position="end">
				    <BsSearch size={22}/>
				</InputAdornment>
			    )
			}}
		    />
		    <div className="flex flex-row space-x-4">
			<div className="group">
			    <ButtonWithIconOnBottom text='Избранные' icon={<MdFavoriteBorder size={25}/>}/>
			</div>
			<div className="group">
			    <ButtonWithIconOnBottom text='Корзина' icon={<AiOutlineShoppingCart size={25}/>}/>
			</div>
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
    )
}

export const TopBar = () => {
    return (
	<div className="bg-white lg:w-[1200px] mx-auto p-2 space-y-2">
	    <div className="flex flex-row justify-between">
		<div className="flex flex-row space-x-1 items-center">
		    <BiMap/>			
		    <p className="text-sm">Усть-Каменогорск</p>
		</div>
		<h1>8-777-613-4709</h1>
	    </div>
	</div>
    )
}

const ButtonWithIconOnBottom = ({ text, icon, bold }: { text?: string, icon: ReactNode, bold?: boolean }) => {
    return (
	<IconContext.Provider value={{ color: '#89b4ff', className: "" }}>
	    <div className="flex flex-col items-center cursor-pointer">
		<div className="">
		    {icon}
		</div>
		<span className={"group-hover:text-[#89b4ff] transition duration-150 ease-in-out " + (bold ? "font-semibold" : '')}>
		    {text}
		</span>
	    </div>
	</IconContext.Provider>
    )
}

export default Navbar
