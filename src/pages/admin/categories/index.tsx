import {Button, TextField} from "@mui/material"
import {cloneElement, useState, type ReactElement, type ReactNode} from "react"
import MainLayout from "../../../components/layouts/admin/MainLayout"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
// eslint-ignore-next-line
// @ts-ignore
import { CldUploadWidget, CldImage } from 'next-cloudinary'

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
    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <h1 className="text-white font-semibold text-xl">Категории</h1>
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
