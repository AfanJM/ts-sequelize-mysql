
import path from 'path'

import usersRoutes from '../routes/users'

import db from '../config/db'

import express, {Application}  from 'express'

import cors from 'cors'


class Server {

    private app: Application

    private port: string | undefined

    private pathPublic: string | undefined

    constructor(){

        this.app = express()

        this.port = process.env.PORT || '9000'
        
        this.middlewars()

        this.routes()

        this.db()

    }

    async db(){

        try {

        await db.authenticate()

        console.log('Conectado correctamente a la DB')

        } catch (error) {
            throw new Error('Error a la hora de conectar a la DB')
            
        }
    }

    routes () {
        this.app.use( usersRoutes )
    }

    middlewars(){

        this.app.use( cors() )

        this.app.use( express.json() )

        this.pathPublic = path.join(__dirname, '../../../src/public')

         this.app.use( express.static( this.pathPublic ) );

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server corriendo en el puerto: ', this.port)
        })
    }
}

export default Server