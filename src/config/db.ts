import {Sequelize} from 'sequelize'

const db = new Sequelize( 'server-ts', 'root', '',  {
    host: 'localhost',
    dialect: 'mysql'

})

export default db


