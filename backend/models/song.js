import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js'; 

const Song = sequelize.define('Song', {
  createdAt: { 
    type: DataTypes.DATE,
    allowNull: true, 
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP') 
  },
  updatedAt: { 
    type: DataTypes.DATE, 
    allowNull: true, 
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
  songId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  songname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumId: {
    type: DataTypes.INTEGER
  },
  filePath: {
    type: DataTypes.STRING
  },
  coverPath: {
    type: DataTypes.STRING
  },
  audioMime:{
    type: DataTypes.STRING
  },
  imgMime:{
    type: DataTypes.STRING
  },
  genre: {
    type: DataTypes.STRING
  },
  releaseYear: {
    type: DataTypes.INTEGER
  }
});

export {Song};
