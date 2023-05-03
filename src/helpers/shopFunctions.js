import Swal from 'sweetalert2';
import '../style.css';
import '@sweetalert2/theme-dark/dark.min.css';
import { removeCartID, saveCartID} from './cartFunctions';
import { fetchProduct, descriptions } from './fetchFunctions';

// Função que retorna a data no formado day/month/year
const data = (dateInfo) => {
  let dataInEnglish = dateInfo.substring(0, 10);
  dataInEnglish = dataInEnglish.replace(/[-]/g, "");
  // console.log(dataInEnglish);
  const year = dataInEnglish.substring(0, 4);
  const month = dataInEnglish.substring(4, 6);
  const day = dataInEnglish.substring(6, 8);
  return `${day}/${month}/${year}`;
};

// Função que salva a soma no localStorage
const saveSumShopCar = (sum) => {
  localStorage.setItem('sum', JSON.stringify(sum));
};

// Captura soma do localStorage
let oldSum = 0;
if (JSON.parse(localStorage.getItem('sum'))) {
  oldSum = JSON.parse(localStorage.getItem('sum'));
}

const sumShopCar = oldSum;// Esses comentários que estão antes de cada uma das funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

// Capturando elementos do zoom
const zoomEl = document.querySelector('.zoom');
const zoomImgEl = document.querySelector('.zoom .img');
const mainEl = document.querySelector('main');
const zoomBtnEl = document.querySelector('.zoom button');
const zoomInfo = document.querySelector('.zoom .info');
const zoomDescription = document.querySelector('.description');
const zoomProductInfoEl = document.querySelector('.productInformation');
zoomEl.classList.add('hide');

// Funcionalidade para sair do zoom
const hideZoom = () => {
  zoomEl.classList.add('hide');
  const time = 1000;
  setTimeout(() => {
    zoomEl.style.display = 'none';
  }, time);
  mainEl.classList.remove('esconde');
};

zoomBtnEl.addEventListener('click', hideZoom);

// Funcionalidade para aparecer o zoom
const showZoom = () => {
  zoomEl.style.display = 'flex';
  zoomEl.classList.remove('hide');
  mainEl.classList.add('esconde');
  zoomImgEl.scrollTop = 0;
  zoomProductInfoEl.scrollTop = 0;
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
export const getIdFromProduct = (product) =>
  product.querySelector('span.product__id').innerText;

/**
 * Função que remove o produto do carrinho.
 * @param {Element} li - Elemento do produto a ser removido do carrinho.
 * @param {string} id - ID do produto a ser removido do carrinho.
 */
const removeCartProduct = (li, id, sum) => {
  li.remove();
  removeCartID(id, sum);
};

/**
 * Função responsável por criar e retornar um product do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @param {string} product.pictures - Imagens do produto.
 * @returns {Element} Elemento de um product do carrinho.
 */

export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement(
    'div',
    'cart__product__image-container'
  );

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement(
    'div',
    'cart__product__info-container',
  );
  infoContainer.appendChild(
    createCustomElement('span', 'product__title', title)
  );
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(
    createCustomElement('span', 'product__price__value', price.toFixed(2))
  );
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', async () => {
    let sum = 0;
    await fetchProduct(id).then((info) => {
      oldSum -= Number(info.price);
      console.log(oldSum, 'remove');
      removeCartProduct(li, id, oldSum);
    });
  });
  return li;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @param {number} product.price - Preço do produto.
 * @returns {Element} Elemento de produto.
 */
const criaBtnAdd = (tag, className, innerText) => {
  const cartButton = createCustomElement(
    tag,
    className,
    innerText,
  );
  return cartButton;
};

export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';
  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');

  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price.toFixed(2)));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Saiba mais',
  );
  section.appendChild(cartButton);
  cartButton.addEventListener('click', async () => {
    const info2 = await fetchProduct(id);
    const { pictures } = info2;
    const local = info2.seller_address;
    zoomImgEl.innerHTML = '';
    zoomInfo.innerHTML = '';
    const description = descriptions.find((productDesc) => productDesc[id]);
    const { video_id } = info2;
    if (video_id !== null) {
      zoomImgEl.innerHTML += `<iframe src="https://www.youtube.com/embed/${video_id}autoplay=1&mute=1" frameborder='0' allowfullscreen></iframe>`;
    }
    pictures.forEach((element) => {
      zoomImgEl.innerHTML += `<div><img src='${element.url}'><div>`;
    });
    zoomInfo.innerHTML += `<p></p><b>${info2.title}</b>`;
    zoomInfo.innerHTML += `<div>RS <b>${Number(price)}</b></div>`;
    zoomInfo.innerHTML += `<p>Anunciado em:<span>
    ${data(info2.date_created)}</span></p>`;
    zoomInfo.innerHTML += `<p>Atualizado em:<span>
    ${data(info2.last_updated)}</span></p>`;
    info2.attributes.forEach((attribute) => {
      if (attribute.id === 'ITEM_CONDITION') {
        zoomInfo.innerHTML += `<p>Condição:<span>
      ${attribute.value_name}</span></p>`;
      }
      if (attribute.id === 'BRAND' && attribute.value_name !== null) {
        zoomInfo.innerHTML += `<p>Marca:<span>
    ${attribute.value_name}</span></p>`;
      }
    });
    if (info2.warranty) zoomInfo.innerHTML += `<p>${info2.warranty}</p>`;
    zoomInfo.innerHTML += `<section><p>Localização: <span>${local.city.name} - 
    ${local.state.id.substring(3, 5)}</span></p></section>`;

    const btnAddEl = criaBtnAdd(
      'button',
      '',
      'Adicionar ao carrinho!',
    );
    btnAddEl.addEventListener('click', async () => {
      const ol = document.querySelector('.cart__products');
      await fetchProduct(id).then((info) => {
        const li = createCartProductElement(info);
        ol.appendChild(li);
        oldSum += Number(info.price);
        saveCartID(id, info.price);
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        showConfirmButton: false,
        text: 'Adicionado!',
        timer: 1500,
        background: 'rgb(0, 0, 0)',
        color: 'rgb(240, 240, 240)',
      });
      hideZoom();
    });
    zoomInfo.appendChild(btnAddEl);
    zoomDescription.innerHTML = '';
    zoomDescription.innerHTML += '<p>Descrição:<p>';
    zoomDescription.innerHTML += `<p>${description[id]}</p>`;
    showZoom();
  });
  return section;
};
