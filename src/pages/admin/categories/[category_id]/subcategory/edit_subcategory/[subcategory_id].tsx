import {Button, TextField} from "@mui/material"
import { useEffect } from "react"
import type { ReactElement } from "react"
import { useState } from "react"
import MainLayout from "../../../../../../components/layouts/admin/MainLayout"
import { trpc } from "../../../../../../utils/trpc"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { AnimatePresence, motion } from "framer-motion"
import { prisma } from "../../../../../../server/db/client"
import {useRouter} from "next/router"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const subcategory = await prisma.subcategory.findUnique({
	where: {
	    id: params?.subcategory_id as string,
	}
    }) 

    return {
	props: { subcategory: JSON.parse(JSON.stringify(subcategory)) }
    }
}

const EditSubcategory = ({ subcategory }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
    const [imageShouldUpdate, setImageShouldUpdate] = useState(false)

    useEffect(() => {
	setValue('name', subcategory.name)
	setValue('description', subcategory.description)
	setValue('image', subcategory.image)
	setImageShouldUpdate(true)
    }, [])
    
    const createSubcategory = trpc.category.createSubcategory.useMutation()
    const onFormSubmit = handleSubmit((data) => {
	createSubcategory
	    .mutateAsync({
		name: data.name,
		description: data.description,
		image: data.image,
		categoryId: router.query.category_id as string,
	    })
	    .then(() => {
		router.push('/admin/categories/' + router.query.category_id)	
	    })
    })

    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <h1 className="text-white font-semibold text-xl">Редактировать подкатегорию</h1>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<h1 className="text-gray-400 font-medium text-md">Заполните данные о подкатегории</h1>
		<div className="space-y-5">
		    <div className="space-y-3">
			<h1 className="text-white text-sm">Название</h1>
			<FieldError error={errors.name}/>
			<TextField 
			    {...register('name', { required: true })}
			    variant="outlined" 
			    size="small" 
			    placeholder={'Название подкатегории'} 
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
			    placeholder="Описание подкатегории" 
			    fullWidth 
			    rows={4}
			    color={errors.description && 'error'}
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
		</div>
	    </div> 
	    <Button 
		onClick={() => onFormSubmit()}
		type='submit'
		variant="outlined" 
		className="rounded-xl h-12 normal-case"
	    >
		Добавить категорию 
	    </Button>
	</div>
    )
}

const ImageUploadWidget = ({ setValue, getValues, imageShouldUpdate, setImageShouldUpdate }: any) => {
    return (
	<div className="flex flex-col justify-center space-y-3">
	    <CldUploadWidget 
		uploadPreset='rvp1ymu8'
		onUpload={(error: unknown, result: unknown, widget: unknown) => {
		    {/*esline-disable-next-line
		     @ts-ignore*/}
		    setValue('image', result?.info.url)
		    setImageShouldUpdate(true)
		}}
	    >
	      {({ open }: any) => {
		function handleOnClick(e: any) {
		  e.preventDefault()
		  open()
		}
		return (
		  <Button 
		    variant='outlined' 
		    onClick={handleOnClick}
		    className='rounded-xl normal-case'
		>
		    Загрузить картинку
		  </Button>
		);
	      }}
	    </CldUploadWidget>
	    {
		imageShouldUpdate ?
		    <CldImage 
			src={getValues().image}
			width="400"
			height="200"
			alt='photo'
		    />
		: null
	    }
	</div>
    )
}

type Inputs = {
    name: string,
    description: string,
    image: string,
}

const validationSchema = yup.object({
    name: yup.string().required('Обязательное поле')
	.max(300, 'Максимум 300 слов'),
    description: yup.string().required('Обязательное поле')
	.max(500, 'Максимум 500 слов'),
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

EditSubcategory.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default EditSubcategory
