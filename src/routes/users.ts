
import { getUser, getUsers, postUser, putUser, deleteUser } from '../controllers/users.controller'

import {Router} from 'express'


const router = Router()

router.get('/user/:id', getUser)

router.get('/users', getUsers)

router.post('/users', postUser)

router.put('/user/:id', putUser)

router.delete('/user/:id', deleteUser)





export default router
