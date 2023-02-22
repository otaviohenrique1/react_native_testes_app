import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";

jest.mock("../../src/servicos/apiLeiloes");

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  }
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe("repositorio/leilao", () => {
  beforeEach(() => {
    apiLeiloes.get.mockClear(); /* mockClear => limpa as requisicoes */
  })

  describe("obtemLeiloes", () => {
    it("Deve retornar uma lista de leilões", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual(mockLeiloes);
      expect(apiLeiloes.get).toHaveBeenCalledWith("/leiloes");
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("Deve retornar uma lista vazia quando a requisição falhar", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual([]);
    });
  });
});

/* jest.mock => Funções de simulação ( mocks em inglês ) permitem que você teste os links entre códigos, apagando a implementação real de uma função, capturando chamadas para a função (e os parâmetros passados nessas chamadas), capturar instâncias do construtor de funções quando instanciado com new, e permitindo configuração em tempo de teste de valores de retorno. */
