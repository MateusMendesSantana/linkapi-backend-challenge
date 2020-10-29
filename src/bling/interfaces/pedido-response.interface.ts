export interface PedidoResponse {
  retorno: Retorno;
}

interface Retorno {
  pedidos: Pedido2[];
}

interface Pedido2 {
  pedido: Pedido;
  notaFiscal: NotaFiscal;
}

interface NotaFiscal {
  numero: string;
  serie: string;
  idNotaFiscal: number;
}

interface Pedido {
  numero: string;
  idPedido: number;
  codigos_rastreamento: Codigosrastreamento;
  volumes: Volume2[];
}

interface Volume2 {
  volume: Volume;
}

interface Volume {
  servico: string;
  codigoRastreamento: string;
}

interface Codigosrastreamento {
  codigo_rastreamento: string;
}