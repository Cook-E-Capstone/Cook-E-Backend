import express from 'express';

import router from './routes/router.communtity';
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
