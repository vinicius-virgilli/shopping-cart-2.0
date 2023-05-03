import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it(`Testa se fecth é chamada ao executar a função com o 
  parâmetro "MLB1405519561"`, async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it(`Testa se ao executar a função com o 
  parâmetro "MLB1405519561" a função fetch usa o endepoint "https://api.mercadolibre.com/items/MLB1405519561"`, async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it(`Testa se o retorno da função com o 
  parâmetro "MLB1405519561" está correto`, async () => {
    const retorno = await fetchProduct('MLB1405519561');
    expect(retorno).toEqual(product);
  });

  it(`Testa se o retorno da função sem 
  parâmetro é um erro com a mensagem "ID não informado"`, async () => {
    const errorMessage = 'ID não informado';
    await expect(fetchProduct()).rejects.toThrowError(errorMessage);
  });
});
