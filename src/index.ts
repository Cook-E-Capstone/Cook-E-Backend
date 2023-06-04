import express, { Request, Response } from 'express';

import CommunityRouter from './routers/router.community';
import UserRouter from './routers/router.user';

const app = express();
const port = process.env.PORT || 8080;

const myMiddleware = (req, res, next) => {
  // Perform actions on the request or response
  console.log('Middleware executed');
  next(); // Pass control to the next middleware function
};

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

// Register middleware function
app.use(myMiddleware);

app.use(CommunityRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
