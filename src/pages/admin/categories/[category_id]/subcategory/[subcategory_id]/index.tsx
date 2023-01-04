import type {ReactElement} from "react"
import { CldImage } from 'next-cloudinary'
import MainLayout from "../../../../../../components/layouts/admin/MainLayout"
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { prisma } from "../../../../../../server/db/client"
import type { Subcategory } from "@prisma/client"
import {Button, ThemeProvider} from "@mui/material"
import {useRouter} from "next/router"
import {AiOutlinePlus} from "react-icons/ai"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import {darkTheme} from "../../../../../../styles/themes"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const subcategory = await prisma.subcategory.findFirst({
	where: {
	    id: params?.subcategory_id as string,
	}
    })

    const filters = await prisma.filter.findMany({
	where: {
	    subcategoryId: params?.subcategory_id as string,
	}
    })

    return {
	props: { 
	    filters: JSON.parse(JSON.stringify(filters)),
	    subcategory: JSON.parse(JSON.stringify(subcategory)),
	    categoryId: params?.category_id,
	},
    }
}

const Filters = ({ filters, subcategory, categoryId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()

    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <div className="flex flex-row justify-between">
		<h1 className="text-white font-semibold text-xl">{subcategory.name}</h1>
		<div className="flex flex-col space-y-2">
		    <Button 
			onClick={() => router.push(
			    '/admin/categories/' + 
			    categoryId +
			    '/subcategory/' +
			    subcategory.id +
			    '/filters/edit_filter'
			)} 
			variant='outlined' 
			className='rounded-xl text-white font-semibold normal-case'
		    >
			<AiOutlinePlus className="mr-2 font-semibold" size={20}/>
			Добавить фильтр
		    </Button>
		    <Button 
			onClick={() => router.push(
			    '/admin/categories/' + 
			    categoryId +
			    '/subcategory/edit_subcategory/' +
			    subcategory.id
			)} 
			variant='outlined' 
			className='rounded-xl text-white font-semibold normal-case'
		    >
			<AiOutlineEdit className="mr-2 font-semibold" size={20}/>
			Редактировать подкатегорию
		    </Button>
		</div>
	    </div>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<div className="space-y-5">
		    <TableView
			subcategories={filters}
		    />
		</div>
	    </div> 
	</div>
    )
}

const TableView = ({ subcategories }: { subcategories: Subcategory[] }) => {
    const router = useRouter()

    const columns: GridColDef[] = [
	{ 
	    field: 'name',
	    headerName: 'Подкатегория',
	    width: 180, 
	    headerAlign: 'center',
	    align: 'center',
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
	    align: 'center',
	    sortable: false,
	    headerAlign: 'center',
	},
	{
	    field: "image",
	    headerName: "Картинка",
	    width: 200,
	    headerAlign: 'center',
	    renderCell: (params) => 
		(params.row.image ?
		 <CldImage
		 src={params.row.image}
		 width="300"
		 height="300"
		 className='rounded-xl p-3'
		 alt={params.row.name}
		 /> : null)
	},
	/*{ field: 'createdAt', headerName: 'Создано', width: 200,
	    renderCell: (params) => {
		const now = new Date(params.row.createdAt)
	    	return (
		    <span>{now.toLocaleString()}</span>
		)
	    },
	},
	{ field: 'updatedAt', headerName: 'Обновлено', width: 50,
	    renderCell: (params) => {
		const now = new Date(params.row.updatedAt)
	    	return (
		    <div>{now.toLocaleString()}</div>
		)
	    },
	},*/
	{ 
	    field: 'filters', 
	    headerName: '', 
	    width: 200,
	    headerAlign: 'center',
	    align: 'center',
	    renderCell: (params) => {
	    	return (
		    <Button
			className='normal-case rounded-xl items-center'
			variant="outlined"
			onClick={() => {console.log('c')}}
		    >
			Фильтры
			<AiOutlineArrowRight className="ml-2"/>
		    </Button>
		)
	    },
	},
	{ 
	    field: 'edit', 
	    headerName: '', 
	    width: 200,
	    headerAlign: 'center',
	    align: 'center',
	    renderCell: (params) => {
	    	return (
		    <Button
			className='normal-case rounded-xl items-center bg-blue-500 text-white'
			variant="outlined"
			onClick={() => {
			    router.push('/admin/categories/' +
			    router.query.category_id +
			    '/subcategory/edit_subcategory/' +
			    params.row.id)
			}}
		    >
			Редактировать	
			<AiOutlineArrowRight className="ml-2"/>
		    </Button>
		)
	    },
	},
    ]

    return (
	<ThemeProvider theme={darkTheme}>
	    <div style={{ height: 500, width: '100%' }}>
	      <DataGrid
		rows={subcategories}
		columns={columns}
		pageSize={5}
		rowsPerPageOptions={[5]}
		density='comfortable'
		onRowDoubleClick={(params) => {
		}}
	      />
	    </div>
	</ThemeProvider>
    )
}

Filters.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>	
    )
}

export default Filters
