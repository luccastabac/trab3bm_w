import express, { urlencoded } from 'express';
import usuariosRouter from './routes/usuario';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

// Rota inicial de teste
app.get('/', (req, res) => {
  return res.json({ message: 'Olá mundo!' });
});

// Regista a rota completa do CRUD de utilizadores
app.use('/usuarios', usuariosRouter);

app.listen(port, () => {
  console.log(`🚀 Servidor executando na porta: ${port}`);
});