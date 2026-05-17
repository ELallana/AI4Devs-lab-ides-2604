import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

app.use(cors());

const port = 3010;
const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.post('/candidates', upload.single('resume'), async (req, res) => {
  console.log('POST /candidates received, body keys:', Object.keys(req.body), 'file:', req.file?.originalname);
  try {
    const { name, surname, email, phone, education, job_exp } = req.body;
    const resume = req.file?.buffer;

    const errors: string[] = [];
    if (!name || typeof name !== 'string') errors.push('name is required');
    if (!surname || typeof surname !== 'string') errors.push('surname is required');
    if (!email || typeof email !== 'string') errors.push('email is required');
    if (!phone || typeof phone !== 'string') errors.push('phone is required');

    if (email && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('email has invalid format');
    }

    if (errors.length > 0) {
      res.status(400).json({ error: errors.join('; ') });
      return;
    }

    const candidate = await prisma.candidate.create({
      data: {
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        education: (education as string) || null,
        job_exp: (job_exp as string) || null,
        resume,
      },
    });

    const { resume: _, ...response } = candidate;
    res.status(201).json(response);
  } catch (err: any) {
    console.error(err);
    if (err?.code === 'P2002') {
      res.status(409).json({ error: 'A candidate with this email already exists' });
      return;
    }
    res.status(500).json({ error: 'Failed to create candidate' });
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
