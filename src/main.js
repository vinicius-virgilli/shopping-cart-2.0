// import { Terser } from 'vite';
// import Swal from '@sweetalert2/theme-dark/dark.min.css';
import Swal from 'sweetalert2';
import './style.css';
import '@sweetalert2/theme-dark/dark.min.css';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, updateCarAside } from './helpers/cartFunctions';

// Capturando elementos importantes
const carShopEl = document.querySelector('.cart');
const loginContainerEl = document.querySelector('.loginContainer');
const productsContainerEl = document.querySelector('.products');
const walletContainerEl = document.querySelector('.walletContainer');
const helloEl = document.querySelector('.hello');
const sectionProducts = document.querySelector('.products');
const finalizarBtnEl = document.querySelector('.finalizar');
let nameUser;
let address;

if (JSON.parse(localStorage.getItem('address'))) {
  address = JSON.parse(localStorage.getItem('address'));
}

// Funcionalidade salva no localStorage, bem como o scrollY da página principal
const saveSearchedProduct = (searchedProduct, mainScrol) => {
  localStorage.setItem('searchedProduct', JSON.stringify(searchedProduct));
  localStorage.setItem('mainScroll', JSON.stringify(mainScrol));
};

// Cria lista de produtos dinamicamente
let productsList;
const searchFunction = async (searchedProduct) => fetchProductsList(searchedProduct)
  .then((Response) => {
    sectionProducts.innerHTML = '';
    productsList = Response;
    productsList.forEach((product) => {
      const li = createProductElement(product);
      sectionProducts.appendChild(li);
    });
  })
  .catch(() => {
    Swal.fire({
      /* customClass: {
        popup: 'erroDeBusca',
      }, */
      icon: 'error',
      title: 'Oops...',
      text: 'Produto não encontrado!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  });

// Carrega o carrinho de compras do LocalStorage
const numCarShopEl = document.querySelector('.count');
const ol = document.querySelector('.cart__products');
let shopCarIds;
let sumCarShop;

const loadShopCar = async () => {
  sumCarShop = 0;
  let numProducts = 0;
  shopCarIds = getSavedCartIDs();
  ol.innerHTML = '';
  updateCarAside(numProducts, sumCarShop);
  console.log(sumCarShop);
  localStorage.setItem('sum', JSON.stringify(sumCarShop));
  numCarShopEl.innerHTML = numProducts;
  shopCarIds.forEach(async (id) => {
    numProducts += 1;
    await fetchProduct(id)
      .then((info) => {
        sumCarShop += info.price;
        const li = createCartProductElement(info);
        ol.appendChild(li);
      });
    numCarShopEl.innerHTML = numProducts;
    console.log(sumCarShop);

    updateCarAside(numProducts, sumCarShop);
    console.log(sumCarShop);
    localStorage.setItem('sum', JSON.stringify(sumCarShop));
  });
};

loadShopCar();

// Gerar saldo
const newSaldo = (count = 0) => {
  const num1 = Math.round(Math.floor() * 10 + 1);
  let num2;
  let num3;
  if (num1 <= 7) {
    num2 = Math.floor(Math.random() * 150 + 1);
  } else {
    num2 = Math.floor(Math.random() * 500 + 1);
  }
  if (num1 <= 7) {
    num3 = Math.floor(Math.random() * 5 + 1);
  } else {
    num3 = Math.floor(Math.random() * 100 + 1);
  }
  return num2 * num3;
};

// Update Wallet
const walletCashEl = document.querySelector('.walletCash');
const walletAddressEl = document.querySelector('.walletAddress');
const walletHistoryEl = document.querySelector('.walletHistory');
const walletAddCashBtn = document.querySelector('.walletAddCash');
const walletBackBtn = document.querySelector('.walletBack');
if (JSON.parse(localStorage.getItem('history'))) {
  walletHistoryEl.innerHTML = JSON.parse(localStorage.getItem('history'));
} else {
  console.log('zerado');
  walletHistoryEl.innerHTML = '';
}
let countBuys;
let buys;

if (JSON.parse(localStorage.getItem('countBuys'))) {
  countBuys = JSON.parse(localStorage.getItem('countBuys'));
}

if (JSON.parse(localStorage.getItem('buys'))) {
  buys = JSON.parse(localStorage.getItem('buys'));
}

// Gera o histórico de compras
const updateWalletHistory = async (buys, countBuys) => {
  let numProducts = 0;
  shopCarIds = getSavedCartIDs();
  walletHistoryEl.innerHTML = '';
  numCarShopEl.innerHTML = numProducts;
  updateCarAside(numProducts, sumCarShop);
  console.log(sumCarShop);
  localStorage.setItem('sum', JSON.stringify(sumCarShop));
  shopCarIds.forEach(async (id) => {
    console.log('dentro do for');
    numProducts += 1;
    await fetchProduct(id)
      .then((info) => {
        sumCarShop += info.price;
        const li = createCartProductElement(info);
        ol.appendChild(li);
      });
    numCarShopEl.innerHTML = numProducts;
    updateCarAside(numProducts, sumCarShop);
    console.log(sumCarShop);
    localStorage.setItem('sum', JSON.stringify(sumCarShop));
  });
};

walletContainerEl.classList.add('hide');
let saldo;

const updateWallet = () => {
  buys = JSON.parse(localStorage.getItem('buys'));
  countBuys = JSON.parse(localStorage.getItem('countBuys'));
  address = JSON.parse(localStorage.getItem('address'));
  nameUser = JSON.parse(localStorage.getItem('nameUser'));
  if (JSON.parse(localStorage.getItem('saldo'))) {
    saldo = JSON.parse(localStorage.getItem('saldo'));
  } else {
    saldo = newSaldo();
  }
  walletCashEl.innerHTML = `<p>Saldo atual:
  <span>RS ${saldo.toFixed(2)}</span></p>`;
  walletAddressEl.innerHTML = `<p>${address}</p>`;
  localStorage.setItem('saldo', JSON.stringify(saldo));
};

if (JSON.parse(localStorage.getItem('address'))) {
  updateWallet();
}

walletBackBtn.addEventListener('click', () => {
  console.log('aqui');
  walletContainerEl.classList.add('hide');
  productsContainerEl.classList.remove('hide');
});

walletAddCashBtn.addEventListener('click', () => {
  const saldoAtual = JSON.parse(localStorage.getItem('saldo'));
  console.log(saldoAtual);
  if (saldoAtual > 1000) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Seu saldo deve ser menor que RS 1000. Faça compras!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  } else {
    const novoSaldo = newSaldo();
    localStorage.setItem('saldo', JSON.stringify(novoSaldo));
    updateWallet();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      showConfirmButton: false,
      text: `Seu novo saldo é: RS ${novoSaldo}`,
      timer: 1500,
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  }
})

// Login
const inputNameEl = document.querySelector('.inputName');
const cepInputEl = document.querySelector('.cep-input');
const cepButtonEl = document.querySelector('.cep-button');
const searchInputEl = document.querySelector('.search-input');
const searcBtnEl = document.querySelector('.search-btn');
searchInputEl.value = '';
loginContainerEl.classList.add('hide');

console.log(helloEl.innerHTML);
helloEl.addEventListener('click', () => {
  console.log('hello');
  if (helloEl.innerHTML === '<h3>Fazer login</h3>') {
    console.log('entrou');
    loginContainerEl.classList.remove('hide');
    if (!productsContainerEl.classList.contains('hide')) {
      productsContainerEl.classList.add('hide');
    }
    if (!carShopEl.classList.contains('hide')) {
      carShopEl.classList.add('hide');
    }
    if (!walletContainerEl.classList.contains('hide')) {
      walletContainerEl.classList.add('hide');
    }
  }
});

cepButtonEl.addEventListener('click', async (event) => {
  event.preventDefault();
  nameUser = inputNameEl.value;
  const cep = cepInputEl.value;
  address = await searchCep(cep);
  if (!nameUser && !address) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Digite seu nome e CEP por favor!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  } else if (!nameUser) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Digite seu nome por favor!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  } else if (!address) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'CEP inválido!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  }
  if (address && nameUser) {
    localStorage.setItem('address', JSON.stringify(address));
    localStorage.setItem('nameUser', JSON.stringify(nameUser));
    localStorage.setItem('countBuys', JSON.stringify(0));
    localStorage.setItem('buys', JSON.stringify([]));
    helloEl.innerHTML = `Olá, ${nameUser}`;
    walletContainerEl.classList.remove('hide');
    loginContainerEl.classList.add('hide');
    updateCarAside();
    updateWallet();
  }
});

// Funcionalidade de busca dos produtos
const buscaPersonalizada = (parametro, scrollY) => {
  if (parametro === 'Primeiro contato com a aplicação') {
    searcBtnEl.placeholder = '';
    loginContainerEl.classList.remove('hide');
    productsContainerEl.classList.add('hide');
    document.body.style.overflow = 'hidden';
    return '';
  }
  searcBtnEl.placeholder = parametro;
  document.body.style.overflow = 'auto';
  productsContainerEl.classList.remove('hide');
  loginContainerEl.classList.add('hide');
  let timerInterval;
  Swal.fire({
    /* customClass: {
      popup: 'buscando',
    }, */
    background: 'rgb(0, 0, 0)',
    color: 'rgb(240, 240, 240)',
    title: '',
    html: 'Finalizando em: <b></b>',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log('I was closed by the timer');
    }
  });

  window.scrollTo(0, scrollY);
  saveSearchedProduct(parametro, scrollY);
  setTimeout(() => {
    searchFunction(parametro);
  }, 1300);
};

searcBtnEl.addEventListener('click', () => {
  const searchedProduct = searchInputEl.value;
  const { scrollY } = window;
  carShopEl.classList.add('hide');
  walletContainerEl.classList.add('hide');
  buscaPersonalizada(searchedProduct, scrollY);
});

// Carteira Digital
const walletIconEl = document.querySelector('.walletIcon');
walletContainerEl.classList.add('hide');

walletIconEl.addEventListener('click', () => {
  address = JSON.parse(localStorage.getItem('address'));
  nameUser = JSON.parse(localStorage.getItem('nameUser'));
  if (address && nameUser) {
    if (walletContainerEl.classList.contains(hide)) {
      walletContainerEl.classList.remove(hide);
      productsContainerEl.classList.add(hide);
      carShopEl.classList.add(hide);
    } else {
      productsContainerEl.classList.remove(hide);
      walletContainerEl.classList.add('hide');
    }
  }
});

// Funcionalidade de recriar o estado da página salvo no localStorage
const searchedProduct = JSON.parse(localStorage.getItem('searchedProduct'));
if (JSON.parse(localStorage.getItem('nameUser'))) {
  nameUser = JSON.parse(localStorage.getItem('nameUser'));
}
const scrollY = JSON.parse(localStorage.getItem('scrollY'));

if (searchedProduct || nameUser) {
  loginContainerEl.classList.add('hide');
  buscaPersonalizada(searchedProduct, scrollY);
  updateCarAside();
} else {
  buscaPersonalizada('Primeiro contato com a aplicação', 0);
}
if (nameUser) {
  helloEl.innerHTML = `Olá, ${nameUser}`;
}

// Funcionalidade de exibição do carrinho de compras
const symbolCarShopEl = document.querySelector('#carShop');
const hide = 'hide';
carShopEl.classList.add(hide);

symbolCarShopEl.addEventListener('click', () => {
  if (carShopEl.classList.contains(hide)) {
    // console.log('1');
    carShopEl.classList.remove(hide);
    productsContainerEl.classList.add(hide);
    walletContainerEl.classList.add(hide);
  } else if (!walletContainerEl.classList.contains('hide')) {
    // console.log('2');
    carShopEl.classList.remove(hide);
    walletContainerEl.classList.add('hide');
  } else {
    carShopEl.classList.add('hide');
    productsContainerEl.classList.remove(hide);
  }
});

// Opção de continuar comprando
const continuarBtnEl = document.querySelector('.continuar');
continuarBtnEl.addEventListener('click', () => {
  carShopEl.classList.add('hide');
  productsContainerEl.classList.remove('hide');
});

// Opção de finalizar compra
finalizarBtnEl.addEventListener('click', () => {
  address = JSON.parse(localStorage.getItem('address'));
  nameUser = JSON.parse(localStorage.getItem('nameUser'));
  saldo = JSON.parse(localStorage.getItem('saldo'));
  sumCarShop = JSON.parse(localStorage.getItem('sum'));
  const cartProducts = document.querySelector('.cart__products').innerHTML;
  console.log(saldo, sumCarShop);
  if (!address && !nameUser) {
    Swal.fire({
      /* customClass: {
        popup: 'erroDeBusca',
      }, */
      icon: 'error',
      title: 'Oops...',
      text: 'Para finalizar a compra, faça o login!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  } else if (saldo < sumCarShop) {
    Swal.fire({
      /* customClass: {
        popup: 'erroDeBusca',
      }, */
      icon: 'error',
      title: 'Oops...',
      text: 'Seu saldo é insuficiente!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  } else if (sumCarShop === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Adicione pelo menos um produto ao carrinho!',
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
  } else if (address && nameUser && saldo >= sumCarShop) {
    Swal.fire({
      title: 'Compra finalizada!',
      text: `Saldo na carteira digital: RS ${(saldo - sumCarShop).toFixed(2)}`,
      width: 600,
      padding: '3em',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      background: 'rgb(0, 0, 0)',
      color: 'rgb(240, 240, 240)',
    });
    carShopEl.classList.add('hide');
    productsContainerEl.classList.remove('hide');
    console.log(sumCarShop);
    localStorage.setItem('saldo', JSON.stringify(saldo - sumCarShop));
    const div = document.createElement('div');
    div.classList.add('buy');
    const h4 = document.createElement('h4');
    h4.innerHTML = `Total de: RS ${sumCarShop.toFixed(2)}`;
    div.appendChild(h4);
    div.innerHTML += cartProducts;
    walletHistoryEl.appendChild(div);
    console.log(cartProducts.innerHTML);
    localStorage.setItem('cartProducts', JSON.stringify([]));
    localStorage.setItem('sum', JSON.stringify(0));
    loadShopCar();
    updateWallet();
    localStorage.setItem('history', JSON.stringify(walletHistoryEl.innerHTML));
    /* setTimeout(() => {
      location.reload();
    }, 1500) */
  }
});
