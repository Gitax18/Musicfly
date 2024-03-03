import { Sequelize } from 'sequelize';

import { sequelize } from '../database.js';

const Admin = sequelize.define('admin', {
    createdAt: { 
        type: Sequelize.DATE,
        allowNull: true, 
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: true, 
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP') 
    },
    admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
});


export {Admin};