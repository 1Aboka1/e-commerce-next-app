import type {ReactElement} from "react"
import MainLayout from "../../components/layouts/admin/MainLayout"

const Orders = () => {
    return(
	<div className="flex flex-row">
	    Orders page
	</div>
    )
}

Orders.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default Orders
