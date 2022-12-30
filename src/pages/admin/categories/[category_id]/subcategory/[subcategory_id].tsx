import {useRouter} from "next/router"
import type {ReactElement} from "react"
import MainLayout from "../../../../../components/layouts/admin/MainLayout"

const Subcategory = () => {
    const router = useRouter()

    return (
	<div>
	</div>
    ) 
}

Subcategory.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>	
    )
}

export default Subcategory
