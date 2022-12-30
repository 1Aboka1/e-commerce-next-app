import type {ReactElement} from "react"
import MainLayout from "../../../components/layouts/admin/MainLayout"
import { AiOutlineEdit } from 'react-icons/ai'
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { prisma } from "../../../server/db/client"
import type { Category as CategoryType } from "@prisma/client"
import {Button} from "@mui/material"
import {useRouter} from "next/router"
import {AiOutlinePlus} from "react-icons/ai"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const category = await prisma.category.findFirstOrThrow({
	where: {
	    id: params?.id as string,
	}
    })
    const subcategories = await prisma.subcategory.findMany({
	where: {
	    categoryId: params?.id as string,
	}
    })

    return {
	props: { 
	    category: JSON.parse(JSON.stringify(category)),
	    subcategories: JSON.parse(JSON.stringify(subcategories)),
	},
    }
}

const Category = ({ category, subcategories }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()

    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <div className="flex flex-row justify-between">
		<h1 className="text-white font-semibold text-xl">{category.name}</h1>
		<div className="flex flex-col space-y-2">
		    <Button 
			onClick={() => router.push('/admin/categories/subcategory/edit_subcategory')} 
			variant='outlined' 
			className='rounded-xl text-white font-semibold normal-case'
		    >
			<AiOutlinePlus className="mr-2 font-semibold" size={20}/>
			Добавить подкатегорию
		    </Button>
		    <Button 
			onClick={() => router.push('/admin/categories/edit_category/' + category.id)} 
			variant='outlined' 
			className='rounded-xl text-white font-semibold normal-case'
		    >
			<AiOutlineEdit className="mr-2 font-semibold" size={20}/>
			Редактировать категорию
		    </Button>
		</div>
	    </div>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<div className="space-y-5">
		</div>
	    </div> 
	</div>
    )
}

Category.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>	
    )
}

export default Category
