import express from 'express';

import CommunityRouter from './routers/router.community';
import UserRouter from './routers/router.user';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(CommunityRouter);
app.use(UserRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
