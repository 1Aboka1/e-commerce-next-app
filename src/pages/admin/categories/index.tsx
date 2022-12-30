import {Button, ThemeProvider} from "@mui/material"
import {DataGrid} from '@mui/x-data-grid'
import type { GridColDef } from "@mui/x-data-grid"
import { prisma } from "../../../server/db/client"
import type { ReactElement } from "react"
import MainLayout from "../../../components/layouts/admin/MainLayout"
import { CldImage } from 'next-cloudinary'
import {useRouter} from "next/router"
import {AiOutlinePlus} from "react-icons/ai"
import type {Category} from "@prisma/client"
import {darkTheme} from "../../../styles/themes"

export async function getServerSideProps() {
    const categories = await prisma.category.findMany()

    return {
	props: { categories: JSON.parse(JSON.stringify(categories)) },
    }
}

const Categories = ({ categories }: { categories: Category[] }) => {
    const router = useRouter()

    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <div className="flex flex-row justify-between">
		<h1 className="text-white font-semibold text-xl">Категории</h1>
		<Button onClick={() => router.push('/admin/categories/edit_category')} variant='outlined' className='rounded-xl text-white font-semibold normal-case'><AiOutlinePlus className="mr-2 font-semibold" size={20}/>Добавить категорию</Button>
	    </div>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<div className="space-y-5">
		    <TableView
			categories={categories}
		    />
		</div>
	    </div> 
	</div>
    )
}

const TableView = ({ categories }: { categories: Category[] }) => {
    const router = useRouter()

    const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Категория', width: 180,
	    renderCell: (params) => {
		return (
		    <h1 className="font-bold text-tropical-blue-200">{params.row.name}</h1>
		)	
	    }
	},
	{
	    field: 'description',
	    headerName: 'Описание',
	    width: 200,
	    sortable: false,
	},
	{
	    field: "image",
	    headerName: "Картинка",
	    width: 200,
	    renderCell: (params) => 
		(params.row.image ?
		 <CldImage
		 src={params.row.image}
		 width="300"
		 height="300"
		 /> : null)
	},
	{ field: 'createdAt', headerName: 'Создано', width: 200,
	    renderCell: (params) => {
		const now = new Date(params.row.createdAt)
	    	return (
		    <span>{now.toLocaleString()}</span>
		)
	    },
	},
	{ field: 'updatedAt', headerName: 'Обновлено', width: 200,
	    renderCell: (params) => {
		const now = new Date(params.row.createdAt)
	    	return (
		    <div>{now.toLocaleString()}</div>
		)
	    },
	},
    ]

    return (
	<ThemeProvider theme={darkTheme}>
	    <div style={{ height: 500, width: '100%' }}>
	      <DataGrid
		rows={categories}
		columns={columns}
		className='cursor-pointer'
		pageSize={5}
		rowsPerPageOptions={[5]}
		onCellClick={(params) => {
		    router.push('/admin/categories/' + params.row.id)
		}}
	      />
	    </div>
	</ThemeProvider>
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

export default Categories
