import { TagPicker } from "rsuite"
import 'rsuite/dist/rsuite.min.css'

const CustomTagPicker = ({ getValues, setValue }: { getValues: any, setValue: any }) => {
    return (
	<TagPicker
	    creatable
	    data={getValues().options.map((item: any) => {
		    return {
			label: item,
			value: item,
		    }
		})}
	    style={{ width: 300 }}
	    menuStyle={{ width: 300 }}
	    onCreate={(value, item) => {
		setValue('options', value)
	    }}
	    style={}
	/>
    )
}

export default CustomTagPicker
