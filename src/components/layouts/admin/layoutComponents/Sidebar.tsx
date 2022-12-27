import { type ReactNode } from "react"
import {RiDashboard3Line} from "react-icons/ri"
import { motion } from 'framer-motion'

const Sidebar = () => {
    return (
	<div className="bg-special-slate-component basis-1/6 px-4 py-3 space-y-4 min-h-screen">
	    <h1 className="font-bold text-2xl text-white tracking-normal">F A S T B U Y</h1>
	    <h1 className="text-special-slate-text font-semibold">Навигация</h1>
	    <div className="flex flex-col space-y-2">
		{Tabs.map((tab) => <Tab key={tab.name} name={tab.name} icon={tab.icon}/>)}
	    </div>
	    <motion.div
      className="box"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
	</div>
    )
}

const Tabs = [
    {
	name: 'Главная панель',
	icon: <RiDashboard3Line color="white"/>,
	onClick: null,
    }
]

const Tab = ({name, icon}: {name: string, icon: ReactNode}) => {
    return (
	<motion.div className="flex flex-row space-x-3 items-center cursor-pointer group">
	    <div className="rounded-full bg-special-slate-icon w-8 h-8 items-center justify-center flex">
		{icon}
	    </div>
	    <h1 className="text-special-slate-text group-hover:text-gray-100 transition duration-300 ease-in-out">{name}</h1>
	    <motion.div 
		className="absolute bg-white -left-1"
		animate={{
		    scale: 1,
		    borderRadius: "50%",
		    x: 100,
		}}
	    />
	</motion.div>
    )
}

export default Sidebar
