import crypto from 'crypto-js';

// Função para gerar hash da senha
export const hashPassword = (password) => {
  return crypto.SHA256(password).toString();
};

// Verificar senha
export const verifyPassword = (password, hash) => {
  return hashPassword(password) === hash;
};

// Gerar token de sessão
export const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Função para fazer backup
export const createBackup = (data) => {
  const backup = {
    timestamp: new Date().toISOString(),
    data: data,
    version: '1.0',
  };
  return JSON.stringify(backup);
};

// Função para restaurar backup
export const restoreBackup = (backupString) => {
  try {
    const backup = JSON.parse(backupString);
    return backup.data;
  } catch (e) {
    throw new Error('Backup inválido');
  }
};

// Salvar dados com histórico
export const saveWithHistory = (key, newData) => {
  const history = JSON.parse(localStorage.getItem(`${key}_history`) || '[]');
  
  history.push({
    timestamp: new Date().toISOString(),
    data: newData,
  });

  // Manter apenas os últimos 20 registros
  if (history.length > 20) {
    history.shift();
  }

  localStorage.setItem(`${key}_history`, JSON.stringify(history));
  localStorage.setItem(key, JSON.stringify(newData));
};

// Obter histórico
export const getHistory = (key) => {
  return JSON.parse(localStorage.getItem(`${key}_history`) || '[]');
};

// Restaurar versão anterior
export const restoreVersion = (key, index) => {
  const history = getHistory(key);
  if (index >= 0 && index < history.length) {
    const data = history[index].data;
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
  return null;
};
