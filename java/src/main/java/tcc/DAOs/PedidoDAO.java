package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;
import tcc.Models.Pedido;
import tcc.Models.Produto;
import tcc.Models.Vendedor;

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

    @Query(value = "SELECT * FROM pedido\n" +
            "JOIN produto on pedido.fk_produto = produto.id_produto\n" +
            "WHERE produto.fk_vendedor = ?1 AND pedido.status = 'Solicitado' \n " +
            "ORDER BY data_solicitada DESC",
            nativeQuery = true)
    List<Pedido> findByPedidoVendedorIdOrderByDate(long vendedorId);

    List<Pedido> findByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(String status, long vendedorId);

    @Query(value = "SELECT * FROM pedido\n" +
            "JOIN produto on pedido.fk_produto = produto.id_produto\n" +
            "WHERE pedido.fk_cliente = ?1 \n" +
            "ORDER BY FIELD(status, 'Solicitado', 'Confirmado', 'Finalizado', 'Recusado', 'Cancelado')",
            nativeQuery = true)
    List<Pedido> findByProdutoClienteIdOrderByStatus(long clienteId);

    @Query(value = "SELECT * FROM pedido\n" +
            "JOIN produto on pedido.fk_produto = produto.id_produto\n" +
            "WHERE pedido.fk_cliente = ?1 AND pedido.status = 'Solicitado' \n " +
            "ORDER BY data_solicitada DESC",
            nativeQuery = true)
    List<Pedido> findByPedidoClienteIdOrderByDate(long clienteId);

    List<Pedido> findByStatusAndProdutoClienteIdOrderByDataSolicitadaDesc(String status, long clienteId);

}
