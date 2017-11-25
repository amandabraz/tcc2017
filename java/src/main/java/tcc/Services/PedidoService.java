package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.CustomQueryHelpers.*;
import tcc.DAOs.PedidoDAO;
import tcc.Models.Pedido;
import tcc.Models.Produto;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ProdutoService produtoService;

    @Transactional
    public Pedido geraPedido(Pedido pedido) throws IOException {
        try {
            Date dataSolicitada = new Date();
            String cliente = clienteService.buscaCliente(pedido.getCliente().getId()).getUsuario().getCpf();
            Produto produto = produtoService.buscaProduto(pedido.getProduto().getId());
            String frase = dataSolicitada.toString() + produto.getNome() + cliente;
            String token = (stringHexa(gerarHash(frase, "MD5")));
            pedido.setToken(token);
            pedido.setDataSolicitada(dataSolicitada);
            alteraQtdProduto(pedido.getQuantidade(), produto, false);


            return salvarPedido(pedido);
        } catch (Exception e) {
            throw e;
        }
    }

    public void alteraQtdProduto(int qtdPedido, Produto produto, boolean incrementa) throws IOException {
        int novaQtd = 0;
        if (incrementa) {
            novaQtd = produto.getQuantidade() + qtdPedido;
        } else {
            novaQtd = produto.getQuantidade() - qtdPedido;
        }
        produtoService.alteraQuantidadeProduto(produto.getVendedor().getId(), produto.getId(), novaQtd);
    }

    public Pedido salvarPedido(Pedido pedido) {
        return pedidoDAO.save(pedido);
    }

    private static String stringHexa(byte[] bytes) {
        StringBuilder s = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            int parteAlta = ((bytes[i] >> 4) & 0xf) << 4;
            int parteBaixa = bytes[i] & 0xf;
            if (parteAlta == 0) s.append('0');
            s.append(Integer.toHexString(parteAlta | parteBaixa));
        }
        return s.toString();
    }

    public static byte[] gerarHash(String frase, String algoritmo) {
        try {
            MessageDigest md = MessageDigest.getInstance(algoritmo);
            md.update(frase.getBytes());
            return md.digest();
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }

    @Transactional
    public Pedido buscaPedido(Long id) {
        try {
            return pedidoDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Pedido> buscaPedidosVendedor(Long vendedorId) {
        try {
            return pedidoDAO.findByProdutoVendedorIdOrderByStatus(vendedorId);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Pedido> buscaPedidosCliente(Long clienteId) {
        try {
            return pedidoDAO.findByProdutoClienteIdOrderByStatus(clienteId);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Pedido> buscaPedidosPorStatusVendedor(String status, Long vendedorId) {
        try {
            return pedidoDAO.findByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(status, vendedorId);
        } catch (Exception e) {
            throw e;
        }
    }

    public List<Pedido> buscaPedidosPorStatusCliente(String status, Long clienteId) {
        try {
            return pedidoDAO.findByStatusAndClienteIdOrderByDataSolicitadaDesc(status, clienteId);
        } catch (Exception e) {
            throw e;
        }
    }

    public Pedido alterarStatus(Long idPedido, String status) throws IOException {
        try {
            Pedido pedidoAtualizado = pedidoDAO.findOne(idPedido);
            Date data = new Date();
            if (pedidoAtualizado != null
                    && pedidoAtualizado.getStatus() != status) {
                if (status.equals("Confirmado")) {
                    pedidoAtualizado.setDataConfirmacao(data);
                } else if (status.equals("Finalizado")) {
                    pedidoAtualizado.setDataFinalizacao(data);
                } else if (status.equals("Recusado") || status.equals("Cancelado")) {
                    // Incrementar quantidade disponível do produto
                    Produto produto = pedidoAtualizado.getProduto();
                    alteraQtdProduto(pedidoAtualizado.getQuantidade(), produto, true);
                }

             pedidoAtualizado.setStatus(status);

            }
            return this.salvarPedido(pedidoAtualizado);
           } catch (IOException e) {
            throw e;
        }
    }

    @Transactional
    public Pedido buscaPedidoVendedor(String status, Long vendedorId) {
        try {
            return pedidoDAO.findFirstByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(status, vendedorId);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<QuantidadePedidos> quantidadeVendidaProduto(Long vendedorId) {
        try {
            return (List<QuantidadePedidos>) pedidoDAO.findByQuantidadeVendidaProduto(vendedorId);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<Object> buscaValorTotalVendaPorProduto(Long vendedorId, Integer diasParaBusca, Integer quantidadeMaxProdutos) {
        try {
            //pego todos os valores - OBJECT pois a busca no DAO não tem um tipo definido
            List<Object> valorTotalVendaPedidos = (List<Object>)pedidoDAO.findByValorTotalVendaPedidos(vendedorId, diasParaBusca);

            if(valorTotalVendaPedidos.size() > quantidadeMaxProdutos){
                //os valores maiores que quantidadeMaxProdutos são unidos
                Double somaTotalVendaValoresUnidos = 0.0;
                Iterator valoresASeremUnidos = valorTotalVendaPedidos.subList(quantidadeMaxProdutos, valorTotalVendaPedidos.size()).iterator();

                while(valoresASeremUnidos.hasNext()){
                    Object[] umProduto = (Object[]) valoresASeremUnidos.next();
                    somaTotalVendaValoresUnidos += (Double)umProduto[1];
                }
                valorTotalVendaPedidos = valorTotalVendaPedidos.subList(0, quantidadeMaxProdutos);
                Object[] novoProduto = {"Outros Produtos", somaTotalVendaValoresUnidos};
                valorTotalVendaPedidos.add(novoProduto);
            }

            return valorTotalVendaPedidos;

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Transactional
    public int recalculaScoreProduto(Pedido pedido) throws IOException {
        try {
            Produto produto = produtoService.buscaProduto(pedido.getProduto().getId());
            long somaNotas = pedidoDAO.selectSomaNotasPorProduto(produto.getId());
            long countNotas = pedidoDAO.countNotasPorProduto(produto.getId());

            Integer novoScore = Math.round(somaNotas / countNotas);
            // edita e salva Produto
            produto.setScore(novoScore);
            produtoService.editaProduto(produto);

            // retorna score atualizado pra tela de Pedidos
            return novoScore;
        } catch (Exception e) {
            throw e;
        }
    }

    public QuantidadeVendidaCliente qtdVendidaCliente(Long vendedorId, Boolean filtroMensal) {
        try {
                QuantidadeVendidaCliente quantidadeVendidaCliente  = new QuantidadeVendidaCliente();
                Integer qtd = pedidoDAO.findByQtdVendida(vendedorId, buscaData(filtroMensal));
                 if(qtd == null) {
                        quantidadeVendidaCliente.setQuantidadeVendida(0);
                    } else {
                        quantidadeVendidaCliente.setQuantidadeVendida(qtd);
                    }

                int cliente = pedidoDAO.findByQtdClientes(vendedorId, buscaData(filtroMensal));
                 if(cliente == 0){
                     quantidadeVendidaCliente.setNumeroClientes(0);
                 } else {
                     quantidadeVendidaCliente.setNumeroClientes(cliente);
                 }

                Float total = pedidoDAO.findByQtdTotal(vendedorId, buscaData(filtroMensal));
                 if(total == null) {
                     quantidadeVendidaCliente.setValorRecebido(0);
                 } else {
                     quantidadeVendidaCliente.setValorRecebido(total);
                 }


            Integer clienteconquistado = pedidoDAO.findByQtdClientesConquistados(vendedorId, buscaData(filtroMensal));
            if(clienteconquistado == null){
                quantidadeVendidaCliente.setClienteConquistados(0);
            } else {
                quantidadeVendidaCliente.setClienteConquistados(clienteconquistado);
            }

            Float ticketMedio = pedidoDAO.findByTicketMedio(vendedorId, buscaData(filtroMensal));
            if(ticketMedio == null) {
                quantidadeVendidaCliente.setTicketMedio(0);
            } else {
                quantidadeVendidaCliente.setTicketMedio(ticketMedio);
            }


            return quantidadeVendidaCliente;
        } catch (Exception e) {
            throw e;
        }
    }


    @Transactional
    public List<RankingProdutosVendidos> rankingProdutosVendidos (Boolean filtroMensal) {
        try {
            return (List<RankingProdutosVendidos>) pedidoDAO.findByProdutosMaisVendidos(buscaData(filtroMensal));
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<RankingQuantidadeProdutosVendidos> rankingQuantidadeProdutosVendidos (Boolean filtroMensal) {
        try {
            return (List<RankingQuantidadeProdutosVendidos>) pedidoDAO.findByQuantidadeProdutosVendidos(buscaData(filtroMensal));
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<RankingQuantidadeVendas> rankingQuantidadeVendas (Boolean filtroMensal) {
        try {
            return (List<RankingQuantidadeVendas>) pedidoDAO.findByQuantidadeVendas(buscaData(filtroMensal));
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<RankingQuantidadeClientes> rankingQuantidadeClientes (Boolean filtroMensal) {
        try {
            return (List<RankingQuantidadeClientes>) pedidoDAO.findByQuantidadeClientes(buscaData(filtroMensal));
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<RankingMaioresVendedores> rankingMaioresVendedores (Boolean filtroMensal) {
        try {
            return (List<RankingMaioresVendedores>) pedidoDAO.findByMaioresVendedores(buscaData(filtroMensal));
        } catch (Exception e) {
            throw e;
        }
    }

    private Date buscaData (Boolean filtroMensal){
        new Date();
        Date referenceDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(referenceDate);
        if(filtroMensal){
            c.add(Calendar.MONTH, -1);
        } else {
            c.add(Calendar.DAY_OF_WEEK, -7);
        }
        return c.getTime();
    }

    public int buscaQtdPedidosPorCliente(Long clienteId) {
        try {
            return pedidoDAO.countByClienteId(clienteId);
        } catch(Exception e) {
            throw e;
        }
    }

    public int buscaQtdPedidosAvaliadosPorCliente(Long clienteId) {
        try {
            return pedidoDAO.countByNotaGreaterThanAndClienteId(0, clienteId);
        } catch(Exception e) {
            throw e;
        }
    }

    public Pedido insereDataComentarioPedido(Long idPedido) throws Exception {
        try {
            Pedido dataComentarioAtualizada = pedidoDAO.findOne(idPedido);
            Date data = new Date();
            if (dataComentarioAtualizada != null) {
                dataComentarioAtualizada.setDataAvaliado(data);
            }
            return this.salvarPedido(dataComentarioAtualizada);
        } catch (Exception e) {
            throw e;
        }
    }
}
