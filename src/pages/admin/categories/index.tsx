import {Button, TextField} from "@mui/material"
import {cloneElement, useState, type ReactElement, type ReactNode} from "react"
import MainLayout from "../../../components/layouts/admin/MainLayout"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
// eslint-ignore-next-line
// @ts-ignore
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import {useRouter} from "next/router"
import {AiOutlinePlus} from "react-icons/ai"

const Categories = () => {
    const {
	register,
	handleSubmit,
	setValue,
	getValues,
	clearErrors,
	formState: { errors },
    } = useForm<Inputs>({
	resolver: yupResolver(validationSchema)
    })
    const router = useRouter()

    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <div className="flex flex-row justify-between">
		<h1 className="text-white font-semibold text-xl">Категории</h1>
		<Button onClick={() => router.push('/admin/categories/edit_category')} variant='outlined' className='bg-tropical-blue-500 rounded-lg text-white font-semibold normal-case'><AiOutlinePlus className="mr-2 font-semibold" size={20}/>Добавить категорию</Button>
	    </div>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<div className="space-y-5">
		    
		</div>
	    </div> 
	</div>
    )
}

Categories.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

const validationSchema = yup.object({

})

export default Categories
