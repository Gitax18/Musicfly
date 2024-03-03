import { Sequelize } from 'sequelize';

import { sequelize } from '../database.js';

const User = sequelize.define('user', {
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
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
});


export {User};