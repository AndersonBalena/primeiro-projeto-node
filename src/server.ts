import 'reflect-metadata';
import express from 'express';
import appointmentRoutes from './routes/appointments.routes';
import usersRouter from './routes/users.routes';
import sessionsRouter from './routes/sessions.routes';
import './database';

const app = express();
app.use(express.json());

app.use('/appointments', appointmentRoutes);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
