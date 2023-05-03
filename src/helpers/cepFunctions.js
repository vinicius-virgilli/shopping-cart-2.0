// Funcionalidade de exibir o endereço do CEP
const getAddress = async (CEP) => {
  let address;
  try {
    await Promise.any([
      fetch(`https://cep.awesomeapi.com.br/json/${CEP}`),
      fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`),
    ]).then(async (Response) => {
      address = await Response.json();
      if (address.code === 'not_found') throw new Error();
      if (address.code === 'invalid') throw new Error();
      if (address.type === 'service_error') throw new Error();
    });
  } catch {
    return false;
  }
  console.log(address);
  return address;
};

const searchCep = async (CEP) => {
  let retorno;
  const address = await getAddress(CEP);
  if (!address) return false;
  if (address.street) {
    const { street: Rua, neighborhood: Bairro, city: Cidade, state: Estado } = address;
    retorno = `${Rua} - ${Bairro} - ${Cidade} - ${Estado}`;
  } else {
    const { address: Rua, district: Bairro, city: Cidade, state: Estado } = address;
    retorno = `${Rua} - ${Bairro} - ${Cidade} - ${Estado}`;
  }
  console.log(retorno);
  return retorno;
};

// Rua - Bairro - Cidade - Estado
// Praça da Sé - Sé - São Paulo - SP
// getAddress('74395038');

export { getAddress, searchCep };
