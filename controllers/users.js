
import db from '../firebase.js';
import fs from 'fs';
import path from 'path';

/* //Descomentar para rodar localhost
export const exportUsersToJson = async () => {
  try {
    const snapshot = await db.collection('USUARIOS').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    console.log('Arquivo atualizado.');
    return true;
  } catch (error) {
    console.error('Erro ao exportar os usuários:', error);
    return false;
  }
}; */

//Acessar o banco de dados e exportar usuarios para um arquivo Json Local
export const exportUsersToJson = async () => {
  try {
    const snapshot = await db.collection('USUARIOS').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const dirPath = path.resolve('/tmp');
    const filePath = path.resolve(dirPath, 'users.json');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log('Arquivo atualizado.');
    return true;
  } catch (error) {
    console.error('Erro ao exportar os usuários:', error);
    return false;
  }
};

//Pegar todos os usuarios no arquivo Json local
export const getAllUsers = () => {
  try {
    const filePath = path.resolve('/tmp', 'users.json');

    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    return [];
  }
};

//criar users para ser usado no vba
export const postUser = async (req, res) => {
  const id = req.body.email;
  try {
    const newItem = req.body;
    const docRef = await db.collection("USUARIOS").doc(id.toString()).set(newItem);
    res.status(201).send({ id: docRef.id })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//Pegar um usuario pelo id no arquivo Json local
export const getUserById = (userId) => {
  try {
    const filePath = path.resolve('/tmp', 'users.json');

    if (!fs.existsSync(filePath)) {
      console.error('Arquivo de usuários não encontrado:', filePath);
      return null;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);
    return users.find(user => user.id === userId);
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);
    return null;
  }
};

//Atualizar dados de um usuario através do id no arquivo Json local
export const adaptUserData = (userId, newData) => {
  try {
    const data = fs.readFileSync('./data/users.json', 'utf8');
    const users = JSON.parse(data);
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, ...newData };
      } else {
        return user;
      }
    });
    fs.writeFileSync('./data/users.json', JSON.stringify(updatedUsers, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao adaptar dados do usuário:', error);
    return false;
  }
};

export const getUsersByFunctions = (req, res) => {
  try {
    const users = getAllUsers();
    const functionsList = {
      fiscais: users.filter(user => user.funcao === 'FISCAL').map(user => ({ nome: user.nome })),
      resp_petro: users.filter(user => user.funcao === 'RESP_PETRO').map(user => ({ nome: user.nome })),
      resp_proj: users.filter(user => user.funcao === 'RESP_PROJ').map(user => ({ nome: user.nome }))
    };

    res.json(functionsList);
  } catch (error) {
    console.error('Erro ao buscar usuários por funções:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários por funções' });
    return null;
  }
};




