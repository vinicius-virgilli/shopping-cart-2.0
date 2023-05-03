import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it(`o retorno da função fetchProductsList com o argumento "computador" 
  é uma estrutura de dados correta`, async () => {
    const retorno = await fetchProductsList('computador');
    expect(retorno).toEqual(computadorSearch);
  });

  it(`Ao chamar a função fetchProductsList sem argumento 
  retorna um erro com a mensagem: 'Termo de busca não informado`, async () => {
    const errorMessage = 'Termo de busca não informado';
    await expect(fetchProductsList()).rejects.toThrowError(errorMessage);
  });
});
