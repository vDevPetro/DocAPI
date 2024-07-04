
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

//Pegar um usuario pelo id no arquivo Json local
export const getUserById = (userId) => {
  try {
    const filePath = path.resolve('/tmp', 'users.json');

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





