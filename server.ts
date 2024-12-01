import app from './app';
import { sequelize } from './models/index';

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log(process.env.PORT);
  console.log('Database synced!');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
