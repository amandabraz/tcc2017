package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;
import tcc.Models.Pedido;

import java.util.List;

public interface PedidoDAO extends CrudRepository<Pedido, Long>{

    List<Pedido> findById(Long id);
    List<Pedido> findByStatus(String status);
    List<Pedido> findByCliente(Cliente cliente);

    @Query(value = "SELECT * FROM pedido\n" +
            "JOIN produto on pedido.fk_produto = produto.id_produto\n" +
            "WHERE produto.fk_vendedor = ?1 \n" +
            "ORDER BY FIELD(status, 'Solicitado', 'Confirmado', 'Finalizado', 'Recusado', 'Cancelado')",
            nativeQuery = true)
    List<Pedido> findByProdutoVendedorIdOrderByStatus(long vendedorId);

    List<Pedido> findByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(String status, long vendedorId);

}
