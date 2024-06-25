import express from 'express';
import{
  exportUsersToJson,
  getAllUsers,
  getUserById,
  adaptUserData
} from '../controllers/users.js';

const router = express.Router();

router.get('/export-users', async (req, res) => {
  const success = await exportUsersToJson();
  if (success) {
    res.status(200).json({ message: 'Usuários exportados com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao exportar usuários' });
  }
});

router.get('/', (req, res) => {
  const users = getAllUsers();
  res.status(200).json(users);
});


router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = getUserById(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const newData = req.body; // Assume que os novos dados estão no corpo da requisição
  const success = adaptUserData(userId, newData);
  if (success) {
    res.status(200).json({ message: 'Dados do usuário atualizados com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
  }
});

export default router;