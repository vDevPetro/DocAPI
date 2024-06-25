
import db from '../firebase.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const exportUsersToJson = async () => {
  try {
    const snapshot = await db.collection('USUARIOS').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Define o caminho absoluto para o arquivo no diretório /tmp
    const dirPath = path.resolve('/tmp');
    const filePath = path.resolve(dirPath, 'users.json');

    // Verifica se o diretório /tmp existe, se não, cria-o
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Escreve o arquivo JSON no sistema de arquivos
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log('Arquivo atualizado.');
    return true;
  } catch (error) {
    console.error('Erro ao exportar os usuários:', error);
    return false;
  }
};

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





