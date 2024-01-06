import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.🍕');
  } catch (error) {
    console.log(error);
  }
};

export const syncd = async () => {
  try {
    await sequelize.sync(); //sync({force: true})
    console.log('Connection has been synced successfully!🍔');
  } catch (error) {
    console.log(error);
  }
};
