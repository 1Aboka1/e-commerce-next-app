import type {ReactElement} from "react"
import MainLayout from "../../components/layouts/admin/MainLayout"

const Users = () => {
    return(
	<div className="flex flex-row">
	    Users page
	</div>
    )
}

Users.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default Users
