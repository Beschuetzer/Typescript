import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos';
const app = express();
const port: number = 3005;

app.use(express.json()); 

app.use(todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err);
    console.log(req.body);
    res.status(500).json({message: err.message});
  }
  else next();
})

app.listen(port || process.env.PORT, () => {
  console.log('Server running on port: ' + port);
})