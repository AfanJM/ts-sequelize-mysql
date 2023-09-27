
import usuarios from "../models/users";

import { Request, Response } from "express";


export const getUser = async (req: Request, res: Response) => {

    const {id} = req.params

    try {

    const user = await usuarios.findByPk(id)

    if(!user) return res.status(404).json({Message: 'No existe este usuario'})

    return res.json({
        user,
        msg: 'Usuario por id'
    })
        
    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})

    }
}


export const getUsers = async (req: Request, res: Response) => {

    try 
    {
        const users = await usuarios.findAll();

        return res.json({
            users,
            msg: 'Lista de usuarios'
        })
        
    } catch (error) {

        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }

}



export const postUser = async (req: Request, res: Response) => {

    const {nombre, email} = req.body
    
    try {

        const existEmail = await usuarios.findOne({
            where: {
                email: email
            }
        })

        if(existEmail) return res.status(400).json({Message: 'Ya existe un usuario con este email'})
   
        const users = await usuarios.create({nombre, email})

        return res.json({
            users,
            msg: 'Usuario creado correctamente'
        })

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})

    }


    
}


export const putUser = async (req: Request, res: Response) => {

    const {nombre, email} = req.body

    const {id} = req.params

    const findUser = await usuarios.findByPk(id)

    if(!findUser) return res.status(500).json({Message: 'El usuario no existe'})

    const user = await usuarios.update({nombre, email}, {
        where: {id}
    })

    res.json({
        user,
        msg: 'usuario actualizado'
    })
}


export const deleteUser = async (req: Request, res: Response) => {
    
    const {id} = req.params    

    const existUser = await usuarios.findByPk(id)

    if(!existUser) return res.status(404).json({Message: 'El usuario no existe'})

    const user = await usuarios.update({estado: false}, {
        where: {
            id
        }
    })
    //update usuarios set id estado = ? where = ? [estado, id ]

    res.json({
       user,
       msg: 'Usuario eliminado'
    })
}