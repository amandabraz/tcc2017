package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;
import tcc.Models.Pedido;

import java.util.List;

public interface PedidoDAO extends CrudRepository<Pedido, Long>{

    List<Pedido> findById(Long id);
    List<Pedido> findByStatus(String status);
    List<Pedido> findByCliente(Cliente cliente);
    List<Pedido> findByProdutoVendedorId(long vendedorId);

}
