export interface ICreatePedido {
  cliente: {
    nome: string;
  };
  itens: {
    item: {
      codigo: number,
      descricao: string,
      vlr_unit: number,
      qtde: string
    }
  }
}