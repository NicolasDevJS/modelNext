// utils/users.js
import fs from 'fs';
import path from 'path';

// Caminho para o arquivo de dados dos usuários
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// Função para ler os dados do arquivo
export function readUsersFromFile() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data); // Converte a string JSON de volta para um array de objetos
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return []; // Retorna um array vazio se houver um erro na leitura
  }
}

// Função para escrever os dados no arquivo
export function writeUsersToFile(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); // Converte o array de objetos para uma string JSON e escreve no arquivo
  } catch (error) {
    console.error('Erro ao escrever no arquivo:', error);
  }
}
