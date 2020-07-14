import express from 'express';
import appointmentRoutes from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const app = express();

app.use('/appointments', appointmentRoutes);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

export default app;
