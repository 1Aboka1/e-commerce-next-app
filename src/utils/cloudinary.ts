import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    secure: true
})

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
}

const uploadImage = async (imagePath: string) => {
    try {
	const result = await cloudinary.uploader.upload(imagePath, options)
	console.log(result)
	return result.public_id
    } catch(error) {
	console.error(error)
    }
}

export default uploadImage
