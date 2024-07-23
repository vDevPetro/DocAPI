import express from 'express';
import{
  exportUsersToJson,
  getAllUsers,
  getUserById,
  adaptUserData,
  getUsersByFunctions
} from '../controllers/users.js';


const router = express.Router();

//USERS CRUD
router.get('/export-users', async (req, res) => {
  const success = await exportUsersToJson();
  if (success) {
    res.status(200).json({ message: 'Usuários exportados com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao exportar usuários' });
  }
});

// Rota para retornar todas as funções e usuários associados
router.get('/all-functions', getUsersByFunctions);

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
  const newData = req.body; 
  const success = adaptUserData(userId, newData);
  if (success) {
    res.status(200).json({ message: 'Dados do usuário atualizados com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
  }
});


export default router;