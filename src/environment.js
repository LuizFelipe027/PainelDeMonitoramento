let ambiente = 'producao';

export const urlApi = ambiente === 'localhost' ? 'http://localhost:4011/api' : 'https://api.conectasupply.com.br/api'
