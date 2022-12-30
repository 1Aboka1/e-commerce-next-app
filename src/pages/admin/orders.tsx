import type {ReactElement} from "react"
import MainLayout from "../../components/layouts/admin/MainLayout"
import BreadCrumb from "../../components/layouts/admin/layoutComponents/BreadCrumb"
import {useRouter} from "next/router"

const Orders = () => {
    return(
	<div className="flex flex-row">
	    Orders page
	</div>
    )
}

enum Routes {
    categories = "Категории",
    products = 'Продукты',
    orders = 'Заказы',
    users = 'Пользователи',

    
}

Orders.getLayout = function getLayout(page: ReactElement) {
    const Router = () => {
	const router = useRouter()
	return router
    }
    const route = Router().pathname
    const routes = route.split('/').slice(1, route.length)
    console.log(routes)

    return (
	<>
	    <MainLayout>
		<>
		    <BreadCrumb links={Router().pathname}/>
		    {page}
		</>
	    </MainLayout>
	</>
    )
}

export default Orders
