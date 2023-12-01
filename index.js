const axios = require('axios');
const apikey = '91bc49ef1bcb726c6e9275ce05fae1fa'

const cidade = 'Sao Caetano do Sul';


async function obterCoordenadas() {
   const api = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apikey}&lang-pt`;

    try {
      const resposta = await axios.get(api);
      const coordenadas = resposta.data[0].lat + ',' + resposta.data[0].lon;
      return coordenadas;
    } catch (erro) {
      console.error('Erro ao obter coordenadas dessa cidade:', erro);
      throw erro;
    }
  }

  async function obterSensacaoAtual(coordenadas) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.split(',')[0]}&lon=${coordenadas.split(',')[1]}&appid=${apikey}&units=metric&lang=pt`;
  
    try {
      const resposta = await axios.get(api);
      const sensacaoTermica = resposta.data.main.feels_like;
      const descricao = resposta.data.weather[0].description;
  
      console.log('Sensação Térmica:', sensacaoTermica);
      console.log('Descrição:', descricao);
  
    } catch (erro) {
      console.error('Erro ao obter informações do clima:', erro.message);
      throw erro;
    }
  }
  


  async function main() {
    try {
      const coordenadas = await obterCoordenadas();
      await obterSensacaoAtual(coordenadas);

    } catch (erro) {
      console.error('Ocorreu um erro:', erro.message);
    }
  };

  main();