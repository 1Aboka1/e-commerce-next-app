import {Button, ListSubheader, MenuItem, Select, TextField} from "@mui/material"
import { cloneElement, Fragment, useState, } from "react"
import type { ReactElement, ReactNode } from 'react'
import MainLayout from "../../../../components/layouts/admin/MainLayout"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { AnimatePresence, motion } from "framer-motion"
import ImageUploadWidget from "../../../../components/ImageUploadWidget"
import { prisma } from "../../../../server/db/client"
import {GetServerSideProps, InferGetServerSidePropsType} from "next"

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await prisma.category.findMany({
	include: {
	    subcategories: true,
	},
    })

    return {
	props: { categories: JSON.parse(JSON.stringify(categories)) }
    }
} 

const EditProduct = ({ categories }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
    const [imageShouldUpdate, setImageShouldUpdate] = useState(false)

    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <h1 className="text-white font-semibold text-xl">Редактировать продукт</h1>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<h1 className="text-gray-400 font-medium text-md">Заполните данные о продукте</h1>
		<div className="space-y-5">
		    <div className="space-y-3">
			<h1 className="text-white text-sm">Название</h1>
			<FieldError error={errors.name}/>
			<TextField 
			    {...register('name', { required: true })}
			    variant="outlined" 
			    size="small" 
			    placeholder={'Название продукта'} 
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
			    placeholder="Описание продукта" 
			    fullWidth 
			    rows={4}
			    color={errors.description && 'error'}
			/>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">Цена</h1>
			<FieldError error={errors.price}/>
			<TextField 
			    {...register('price', { required: true })}
			    variant="outlined" 
			    size='small' 
			    placeholder="Цена товара" 
			    fullWidth 
			    color={errors.price && 'error'}
			/>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">В наличии</h1>
			<FieldError error={errors.quantityLeft}/>
			<TextField 
			    {...register('quantityLeft', { required: true })}
			    variant="outlined" 
			    size='small' 
			    placeholder="Осталось товаров в наличии" 
			    fullWidth 
			    color={errors.quantityLeft && 'error'}
			/>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">{'Картинка'}</h1>
			<FieldError error={errors.image}/>
			<ImageUploadWidget
			    setValue={setValue}
			    getValues={getValues}
			    imageShouldUpdate={imageShouldUpdate}
			    setImageShouldUpdate={setImageShouldUpdate}
			/>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">{'Категория товара'}</h1>
			<FieldError error={errors.subcategoryId}/>
			<Select
			    color={errors.subcategoryId && 'error'}
			    fullWidth
			    size="small"
			    placeholder="Выберите категорию товара"
			    className="rounded-xl"
			    value={getValues('subcategoryId')}
			    onChange={(event) => { setValue('subcategoryId', event.target.value) }}
			>
			    {
				categories.map((category: typeof categories[0]) => [
					    <ListSubheader key={category.id}>{category.name}</ListSubheader>,
					    category.subcategories.map((subcategory: typeof category.subcategories[0]) => {
						return (
						    <MenuItem 
							key={subcategory.id}
							value={subcategory.id}
						    >
							{subcategory.name}
						    </MenuItem> 
						)
					    })
				])
			    }
			</Select>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">{'Фильтры товара'}</h1>
			<FieldError error={errors.filters}/>
			<Select
			    color={errors.filters && 'error'}
			    fullWidth
			    size="small"
			    placeholder="Выберите фильтры товара"
			    className="rounded-xl"
			    value={getValues('filters')}
			    onChange={(event) => { setValue('filters', event.target.value) }}
			>
			    {
				categories.map((category: typeof categories[0]) => [
					    <ListSubheader key={category.id}>{category.name}</ListSubheader>,
					    category.subcategories.map((subcategory: typeof category.subcategories[0]) => {
						return (
						    <MenuItem 
							key={subcategory.id}
							value={subcategory.id}
						    >
							{subcategory.name}
						    </MenuItem> 
						)
					    })
				])
			    }
			</Select>
		    </div>
		</div>
	    </div> 
	    <Button onClick={() => console.log(getValues())} variant="outlined" className="rounded-xl h-12 normal-case">Загрузить товар</Button>
	</div>
    )
}

type Inputs = {
    name: string,
    description: string,
    price: number,
    quantityLeft: number,
    image: string,
    subcategoryId: string,
    filters: null,
}

const validationSchema = yup.object({
    name: yup.string().required('Обязательное поле')
	.max(300, 'Максимум 300 слов'),
    description: yup.string().required('Обязательное поле')
	.max(500, 'Максимум 500 слов'),
    price: yup.number().required('Введите число')
	.max(999999, 'Слишком большое число'),
    quantityLeft: yup.number().required('Введите число')
	.max(999999, 'Слишком большое число'),
    image: yup.string().required('Вставьте картинку'),
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

EditProduct.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default EditProduct
