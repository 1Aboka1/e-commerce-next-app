import {Button} from '@mui/material'
import { CldUploadWidget, CldImage } from 'next-cloudinary'

const ImageUploadWidget = ({ setValue, getValues, imageShouldUpdate, setImageShouldUpdate }: any) => {
    return (
	<div className="flex flex-col justify-center space-y-3">
	    <CldUploadWidget 
		uploadPreset='rvp1ymu8'
		onUpload={(error: unknown, result: unknown, widget: unknown) => {
		    {/*esline-disable-next-line
		     @ts-ignore*/}
		    setValue('image', result?.info.url)
		    setImageShouldUpdate(true)
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
		imageShouldUpdate ?
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

export default ImageUploadWidget
