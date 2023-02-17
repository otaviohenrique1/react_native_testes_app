import { obtemLeiloes, obtemLeilao } from "../../src/repositorio/leilao";

jest.mock("../../src/servicos/apiLeiloes")

describe("repositorio/leilao", () => {
  describe("obtemLeiloes", () => {
    it("Deve retornar uma lista de leilões", async () => {
      const leiloes = await obtemLeiloes();
    });
  });
});

