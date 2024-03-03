import { Sequelize } from 'sequelize';
const username = process.env.DB_USRNM;
const password = process.env.DB_PWD;
const sequelize = new Sequelize('musicfly-db', username, password, {dialect: 'mysql', host: 'localhost'});

export {sequelize};

