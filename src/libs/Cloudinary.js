import {v2 as cloudinary} from 'cloudinary';


//importando variables de entorno:

import dotenv from 'dotenv'
dotenv.config()


//creando la conexion:

cloudinary.config(process.env.CLOUDINARY_URL)

//creando controladores de imagenes
const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'books'
    })
}

const deleteImage = async id =>{
    return await
    cloudinary.uploader.destroy(id)
}


//exportando los controladores
export {
    uploadImage,
    deleteImage
}
