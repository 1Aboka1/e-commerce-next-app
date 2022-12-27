import {InputAdornment, TextField} from "@mui/material"
import {type ReactNode} from "react"
import { AiOutlineUser } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { TfiMenuAlt } from 'react-icons/tfi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { BiMap } from 'react-icons/bi'
import {useRouter} from "next/router"
import {signOut, useSession} from "next-auth/react"
import {IconContext} from "react-icons"

const Navbar = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const firstName = session?.user?.name?.substring(0, session?.user.name.indexOf(' '))

    return (
	<div className="border-b-2 shadow-md sticky top-0 bg-white z-50">
	    <div className="bg-white mx-auto p-1 px-5 space-y-2">
		<div className="flex flex-row items-center justify-between space-x-3">
		    <div className="flex flex-row space-x-4 items-center justify-between w-full">
			<TextField 
			    variant="outlined" 
			    size='small' 
			    placeholder="Поиск по сайту"
			    InputProps={{
				endAdornment: (
				    <InputAdornment position="end">
					<BsSearch size={22}/>
				    </InputAdornment>
				)
			    }}
			/>
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
