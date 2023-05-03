// Função para acessar descrição dos produtos e armazenar, junto de seu respectivo id, em um array de objetos "descriptions"
let descriptions = [];
const fetchProductDescription = async (id) => {
  let description;
  try {
    description = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
    if (description.ok) {
      description = await description.json();
      description = description.plain_text;
    } else {
      description = 'Não possui descrição!';
    }
  } catch (error) {
    description = error;
  }
  if (!description) {
    description = 'Não possui descrição!';
  }
  descriptions.push({
    [id]: description,
  });
};

const fetchProduct = async (id) => {
  if (!id) throw new Error('ID não informado');
  const Response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await Response.json();
  return data;
};

const fetchProductsList = async (product) => {
  if (!product || product === '') {
    throw new Error('Termo de busca não informado');
  }
  const Response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await Response.json();
  const { results } = data;
  descriptions = [];
  results.forEach((productInfo) => {
    fetchProductDescription(productInfo.id);
  });
  // console.log(descriptions);
  return results;
};

// fetchProductsList('computador');
export { fetchProductsList, fetchProduct, descriptions };
