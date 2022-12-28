import {TextField} from "@mui/material"
import type {ReactElement, ReactNode} from "react"
import MainLayout from "../../components/layouts/admin/MainLayout"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { CldUploadWidget } from 'next-cloudinary'

type Inputs = {
    name: string,
    description: string,
    price: number,
    quantityLeft: number,
    image: null,
    subcategoryId: null,
    filters: null,
}

const EditProduct = () => {
    const {
	register,
	handleSubmit,
	getValues,
	clearErrors,
	formState: { errors },
    } = useForm<Inputs>({
	resolver: yupResolver(validationSchema)
    })

    return(
	<div className="flex flex-col space-y-5 min-h-screen">
	    <h1 className="text-white font-semibold text-xl">Редактировать продукт</h1>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<h1 className="text-gray-400 font-medium text-md">Заполните данные о продукте</h1>
		<div className="space-y-5">
		    {Fields.map((field) => <FormFields key={field.name} name={field.name} placeholder={field.placeholder} textFieldReplacer={field.textFieldReplacer}/>)}
		</div>
		<CldUploadWidget uploadPreset="next-cloudinary-unsigned">
		  {({ open }: any) => {
		    function handleOnClick(e: any) {
		      e.preventDefault()
		      console.log(open)
		      open()
		    }
		    return (
		      <button onClick={handleOnClick}>
			Upload an Image
		      </button>
		    );
		  }}
		</CldUploadWidget>
	    </div> 
	</div>
    )
}

const Fields = [
    {
	name: 'Название',
	placeholder: 'Название продукта',
    },
    {
	name: 'Описание',
	placeholder: 'Описание продукта',
    },
    {
	name: 'Цена',
	placeholder: 'Цена за штуку',
    },
    {
	name: 'Картинка',
	placeholder: 'Картинка продукта',
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
