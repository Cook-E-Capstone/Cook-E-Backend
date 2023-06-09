import express, { Request, Response } from 'express';

import CommunityRouter from './routers/community';
import UserRouter from './routers/user';
import MLRouter from './routers/ml';

const app = express();
const port = process.env.PORT || 8080;

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/community', CommunityRouter);
app.use('/user', UserRouter);
app.use('/ml', MLRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
