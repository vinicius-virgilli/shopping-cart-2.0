const frete = require('frete');
const cepOrigem = '74395038';
// const cepDestino = '';

// Funcionalidade de cáculo do frete
// const cepInputEl = document.querySelector('.cep-input');
const calcFrete = async (cep) => {
  const results = await frete()
    .cepOrigem(cep)
    .servico(frete.servicos.sedex)
    .prazo('13466321');

  console.log(results);
};

calcFrete('74395038');
