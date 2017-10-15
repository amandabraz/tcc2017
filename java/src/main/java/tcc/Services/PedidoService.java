package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.PedidoDAO;
import tcc.Models.Pedido;

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
    public Pedido salvaPedido(Pedido pedido) throws IOException {
        try {
            Date dataSolicitada = new Date();
            String cliente = clienteService.buscaCliente(pedido.getCliente().getId()).getUsuario().getCpf();
            String produto = produtoService.buscaProduto(pedido.getProduto().getId()).getNome();
            String frase = dataSolicitada.toString() + produto + cliente;
            String token = (stringHexa(gerarHash(frase, "MD5")));
            pedido.setToken(token);
            pedido.setDataSolicitada(dataSolicitada);
            return pedidoDAO.save(pedido);
        } catch (Exception e) {
            throw e;
        }
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

    public List<Pedido> buscaPedidosPorStatusVendedor(String status, Long vendedorId) {
        try {
            return pedidoDAO.findByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(status, vendedorId);
        } catch (Exception e) {
            throw e;
        }
    }

    public Pedido alterarStatus(Long idPedido, String status) throws IOException {
        try {
            Pedido alterarPedido = pedidoDAO.findOne(idPedido);
            Date data = new Date();
            if (alterarPedido != null
                    && alterarPedido.getStatus() != status) {
                if(status.equals("Confirmado")){
                    alterarPedido.setDataConfirmacao(data);
                } else if(status.equals("Finalizado")){
                    alterarPedido.setDataFinalizacao(data);
                }

             alterarPedido.setStatus(status);

            }
            return this.salvaPedido(alterarPedido);

        } catch (IOException e) {
            throw e;
        }
    }
}
