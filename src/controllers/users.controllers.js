import { users } from "../models/users.js";
import bcrypt, { genSalt, hash } from 'bcrypt'
import {v4 as uuidv4} from 'uuid'


const registerUser = async(req, res) => {
    try{
        const {usuario, email, password} = req.body
        if (usuario.length < 6){
            res.status(400).send('The username is too short')
        }
        else if (usuario.length > 20){
            res.status(400).send('The username is too long')
        }
        else if (password.length < 7) {
            res.status(400).send('The password is too short')
        }
        else{
            const getEmail = await users.findAll({
                where:{
                    user_email: email
                }
            })
            if (!getEmail[0] == ''){
                res.status(401).send('The email already exists')
            } 
            else{
                let passwordHash = await bcrypt.hash(password, 10, )
                await users.create({
                user_name: usuario,
                user_email: email,
                user_password: passwordHash,
            })
            res.status(201).json('Usuario creado')
        }        
    }} catch (error) {
        console.error(error)
    }
        }

const loginUser = async(req, res) => {
    try{
        const {password, email} = req.body
    const accesUser = await users.findAll({
        where:{
            user_email: email
        }
    })
    
    if (!accesUser[0]) {
        res.status(401).send('The email does not exists')
    }
    else{
        let passDecrypt = await bcrypt.compare(password, accesUser[0].dataValues.user_password)
        if (passDecrypt == true && accesUser[0].dataValues.user_email == email){
            const uCookie = uuidv4()
            res.cookie('session_token', uCookie, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            })
            res.status(200).json('Correcto')
        }else{
            res.status(422).json('The credentials are wrong')
        }
    }
    } catch (error) {
        console.error(error)
    }
}


export{
    registerUser,
    loginUser,
}
