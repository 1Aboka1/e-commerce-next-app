import type { ReactNode } from "react"
import { AiOutlineUser } from 'react-icons/ai'
import {RiDashboard3Line} from "react-icons/ri"
import { BiCategory } from 'react-icons/bi'
import { BsFillInboxesFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { MdOutlineLocalShipping } from 'react-icons/md'
import {useRouter} from "next/router"

const Sidebar = () => {
    return (
	<div className="bg-special-slate-component sticky basis-1/6 px-4 space-y-4 min-h-screen">
	    <h1 className="font-bold text-2xl mt-3 text-white tracking-normal">F A S T B U Y</h1>
	    <h1 className="text-special-slate-text font-semibold">Навигация</h1>
	    <div className="flex flex-col space-y-2">
		{Tabs.map((tab) => <Tab key={tab.name} name={tab.name} icon={tab.icon} url={tab.url}/>)}
	    </div>
	</div>
    )
}

const Tabs = [
    {
	name: 'Главная панель',
	icon: <RiDashboard3Line color="white"/>,
	url: '/admin',
    },
    {
	name: 'Продукты',
	icon: <BsFillInboxesFill color="white"/>,
	url: '/admin/products',
    },
    {
	name: 'Категории',
	icon: <BiCategory color="white"/>,
	url: '/admin/categories',
    },
    {
	name: 'Пользователи',
	icon: <AiOutlineUser color="white"/>,
	url: '/admin/users',
    },
    {
	name: 'Заказы',
	icon: <MdOutlineLocalShipping color="white"/>,
	url: '/admin/orders',
    },
]

const Tab = ({name, icon, url}: {name: string, icon: ReactNode, url: string}) => {
    const router = useRouter()

    return (
	<motion.div 
	    className="flex flex-row relative py-2 space-x-3 items-center cursor-pointer group"
	    onClick={() => { router.push(url) }}
	>
	    <div className="rounded-full bg-special-slate-icon z-10 w-8 h-8 items-center justify-center flex">
		{icon}
	    </div>
	    <h1 className="text-special-slate-text group-hover:text-gray-100 z-10 transition duration-300 ease-in-out">{name}</h1>
	    {
		url === router.pathname ?
		(
		    <motion.div 
			className="absolute bg-black w-60 rounded-3xl h-full z-0"
			initial={{ left: -500 }}
			animate={{ left: -50 }}
			transition={{ duration: 1 }}
		    />
		) : null
	    }
	</motion.div>
    )
}

export default Sidebar
