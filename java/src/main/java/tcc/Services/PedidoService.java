package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.PedidoDAO;
import tcc.Models.Pedido;
import tcc.Models.Produto;
import tcc.QuantidadePedidos;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
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

}
