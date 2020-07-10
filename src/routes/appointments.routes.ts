import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateApplicationService from '../services/CrateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateApplicationService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
