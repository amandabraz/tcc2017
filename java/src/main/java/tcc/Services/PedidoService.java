package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import tcc.DAOs.PedidoDAO;
import tcc.Models.Pedido;

import javax.transaction.Transactional;
import java.io.IOException;

public class PedidoService {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Transactional
    public Pedido salvaPedido(Pedido pedido) throws IOException {
        try {
            return pedidoDAO.save(pedido);
        } catch (Exception e) {
            throw e;
        }
    }
}
