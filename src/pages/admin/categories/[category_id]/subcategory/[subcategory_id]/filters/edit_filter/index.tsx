import {Button, TextField} from "@mui/material"
import type { ReactElement } from "react"
import { useEffect } from "react"
import MainLayout from "../../../../../../../..//components/layouts/admin/MainLayout"
import { trpc } from "../../../../../../../../utils/trpc"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { AnimatePresence, motion } from "framer-motion"
import {useRouter} from "next/router"
import CustomTagPicker from "../../../../../../../../components/admin/TagPicker"

const EditFilterNew = () => {
    const router = useRouter()
    const {
	register,
	handleSubmit,
	setValue,
	getValues,
	formState: { errors },
    } = useForm<Inputs>({
	resolver: yupResolver(validationSchema)
    })
    
    const createFilter = trpc.category.createFilter.useMutation()
    const onFormSubmit = handleSubmit((data) => {
	createFilter
	    .mutateAsync({
		name: data.name,
		description: data.description,
		subcategoryId: router.query.subcategory_id as string,
		options: data.options,
	    })
	    .then(() => {
		router.push('/admin/categories/' + router.query.category_id + '/subcategory')	
	    })
    })

    useEffect(() => {
	setValue('options', [])
    }, [])

    if(getValues().options !== undefined) {
	return(
	    <div className="flex flex-col space-y-5 min-h-screen mb-8">
		<h1 className="text-white font-semibold text-xl">Добавить фильтр</h1>
		<div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		    <h1 className="text-gray-400 font-medium text-md">Заполните данные о фильтре</h1>
		    <div className="space-y-5">
			<div className="space-y-3">
			    <h1 className="text-white text-sm">Название</h1>
			    <FieldError error={errors.name}/>
			    <TextField 
				{...register('name', { required: true })}
				variant="outlined" 
				size="small" 
				placeholder={'Название фильтра'} 
				fullWidth
				color={errors.name && 'error'}
			    />
			</div>
			<div className="space-y-3">
			    <h1 className="text-white text-sm">Описание</h1>
			    <FieldError error={errors.description}/>
			    <TextField 
				{...register('description', { required: true })}
				variant="outlined" 
				size='small' 
				multiline 
				placeholder="Описание фильтра" 
				fullWidth 
				rows={4}
				color={errors.description && 'error'}
			    />
			</div>
			<div className="space-y-3">
			    <h1 className="text-white text-sm">Варианты</h1>
			    <FieldError error={errors.options}/>
			    <CustomTagPicker
				getValues={getValues}
				setValue={setValue}
			    />
			</div>
		    </div>
		</div> 
		<Button 
		    onClick={() => onFormSubmit()}
		    type='submit'
		    variant="outlined" 
		    className="rounded-xl h-12 normal-case"
		>
		    Добавить фильтр 
		</Button>
	    </div>
	)
    }
}

type Inputs = {
    name: string,
    description: string,
    options: string[],
}

const validationSchema = yup.object({
    name: yup.string().required('Обязательное поле')
	.max(300, 'Максимум 300 слов'),
    description: yup.string().required('Обязательное поле')
	.max(500, 'Максимум 500 слов'),
    options: yup.array().required('Добавьте хотя бы один фильтр'),
})

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

EditFilterNew.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default EditFilterNew
