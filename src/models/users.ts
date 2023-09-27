import { DataTypes } from "sequelize";

import db from "../config/db";

const usuarios = db.define('usuarios', {

    nombre : {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING,
        unique: true
    }, 

    estado: { 
        type: DataTypes.BOOLEAN
    }

})

export default usuarios