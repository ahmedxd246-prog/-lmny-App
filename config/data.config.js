import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'ahmed',
  'root',
  '102030',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.✅🚀');
  } catch (err) {
    console.log('Unable to connect to the database.❌', err.message);
  }
};

export const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.✅');
  } catch (err) {
    console.log('Unable to sync database.❌', err.message);
  }
};

export default connectDB;
