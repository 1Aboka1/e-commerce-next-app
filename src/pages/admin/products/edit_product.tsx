import {Button, TextField} from "@mui/material"
import { cloneElement, useState, } from "react"
import type { ReactElement, ReactNode } from 'react'
import MainLayout from "../../../components/layouts/admin/MainLayout"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { CldUploadWidget, CldImage } from 'next-cloudinary'

const EditProduct = () => {
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
	    <h1 className="text-white font-semibold text-xl">Редактировать продукт</h1>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<h1 className="text-gray-400 font-medium text-md">Заполните данные о продукте</h1>
		<div className="space-y-5">
		    {Fields.map((field) => 
			<FormFields 
			    key={field.name} 
			    name={field.name} 
			    placeholder={field.placeholder} 
			    textFieldReplacer={field.textFieldReplacer !== undefined ? 
				cloneElement(field.textFieldReplacer, { setValue, getValues }) : null}
			/>)
		    }
		</div>
	    </div> 
	    <Button onClick={() => console.log(getValues())} variant="outlined" className="rounded-xl h-12 normal-case">Загрузить товар</Button>
	</div>
    )
}

const ImageUploadWidget = ({ setValue, getValues }: any) => {
    const [cloudinaryServerResponed, setCloudinaryServerResponded] = useState(false)

    return (
	<div className="flex flex-col justify-center space-y-3">
	    <CldUploadWidget 
		uploadPreset='rvp1ymu8'
		onUpload={(error: unknown, result: unknown, widget: unknown) => {
		    {/*esline-disable-next-line
		     @ts-ignore*/}
		    setValue('image', result?.info.url); // Updating local state with asset details
		    setCloudinaryServerResponded(true)
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
		cloudinaryServerResponed ?
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
    price: number,
    quantityLeft: number,
    image: Response,
    subcategoryId: null,
    filters: null,
}

const Fields = [
    {
	name: 'Название',
	placeholder: 'Название продукта',
    },
    {
	name: 'Описание',
	placeholder: 'Описание продукта',
	textFieldReplacer: 
	    <TextField 
		variant="outlined" 
	    	size='small' 
		multiline 
		placeholder="Описание продукта" 
		fullWidth 
		rows={4}
	    />
    },
    {
	name: 'Цена',
	placeholder: 'Цена за штуку',
    },
    {
	name: 'Картинка',
	placeholder: 'Картинка продукта',
	textFieldReplacer: <ImageUploadWidget/>
    },
    {
	name: 'Категория',
	placeholder: 'Категория продукта',
    },
    {
	name: 'Фильтры',
	placeholder: 'Выберите фильтры',
    },
]

const FormFields = ({ name, placeholder, textFieldReplacer }: { name: string, placeholder: string, textFieldReplacer?: ReactNode }) => {
    return (
	<div className="space-y-3">
	    <h1 className="text-white text-sm">{name}</h1>
	    {
		textFieldReplacer ?
		textFieldReplacer :
		<TextField variant="outlined" size="small" placeholder={placeholder} fullWidth/>
	    }
	</div>
    )
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

const validationSchema = yup.object({

})

export default EditProduct
