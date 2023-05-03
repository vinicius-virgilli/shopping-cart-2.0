/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
// Função que salva a soma no localStorage
const saveSumShopCar = (sum) => {
  console.log(sum);
  localStorage.setItem('sum', JSON.stringify(sum));
};

// Função que atualiza o cartAside
let address = JSON.parse(localStorage.getItem('address'));

export const updateCarAside = (numProducts = 0, sum = 0) => {
  address = JSON.parse(localStorage.getItem('address'));
  if (!address) {
    address = 'Faça o login primeiro!';
  }
  const cartAsideQuant = document.querySelector('.cartAsideQuant');
  const cartAsideTotal = document.querySelector('.cartAsideTotal');
  const cartAsidePag = document.querySelector('.cartAsidePag');
  const cartAsideAddress = document.querySelector('.cartAsideAddress');
  cartAsideQuant.innerHTML = `<p>Quantidade de Produtos:<span>${numProducts}</span></p>`;
  cartAsideTotal.innerHTML = `<p>Total:
  <span>RS ${sum.toFixed(2)}</span></p>`;
  cartAsidePag.innerHTML = `<p>Forma de pagamento:
  <span>Carteira Digital</span></p>`;
  cartAsideAddress.innerHTML = `<div>${address}</div>`;
  saveSumShopCar(sum);
};

// Atualiza número do carrinho de compras
const numCarShopEl = document.querySelector('.count');

export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
// Povoa cartAside
const cartAsideQuant = document.querySelector('.cartAsideQuant');

export const saveCartID = (id, price) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  const cartProducts = getSavedCartIDs();
  const oldSum = JSON.parse(localStorage.getItem('sum'));
  const newCartProducts = [...cartProducts, id];
  numCarShopEl.innerText = newCartProducts.length;
  const newSum = oldSum + price;
  console.log(oldSum + price);
  updateCarAside(numCarShopEl.innerHTML, newSum);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id, sum) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  numCarShopEl.innerText = cartProducts.length;
  updateCarAside(numCarShopEl.innerHTML, sum);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

// Post linkedIn

/* const post = [{
  título: 'Shopping Cart 2.0',
  mensagem: `Apresento-lhes uma versão personalizada 
  do projeto 
  Shopping Cart. Foi resultado de algumas horas codando 
  vidrado no feriado prolongado! `,
  descrição: {
    'features implementadas': [
      'Modo Zoom',
      'Contador de produtos',
      'Carteira digital',
      'Login',
      'SweetAlert2 Dark Theme',
    ],
  },
  Dificuldades: [
    'Tratar dados advindos da API',
    'Lógica de esconder e mostrar elementos',
    'Lógica dos cálculos envolvidos',
    'Recuperar dados do local Storage',
  ],
  'Links para acessar o Shopping Cart 2.0': {
    Deploy: 'sdasdf',
    Youtube: 'sdfsad',
    'Repositório no Github': 'sdfs',
  },
  Agradecimentos: {
    Apoiadora: `Minha Irmã Geovanna, por sugerir
    ótimas modificações e ser exigente para o
    resultado final`,
  },
}];

LinkedInPosts.push(post); */
