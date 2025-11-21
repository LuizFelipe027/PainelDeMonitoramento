let ambiente = 'producao';

export const urlApi = ambiente === 'localhost' ? 'http://localhost:4011/api' : 'https://api.kenitscm.com.br/api'
