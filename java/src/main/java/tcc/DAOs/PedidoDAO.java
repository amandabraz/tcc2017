package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;
import tcc.Models.Pedido;
import tcc.QuantidadePedidos;

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

    Pedido findFirstByStatusAndProdutoVendedorIdOrderByDataSolicitada(String status, long vendedorId);

    @Query(value = "SELECT produto.nome, SUM(pedido.quantidade) as qtd_vendida from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.status = 'Solicitado' OR pedido.status = 'Confirmado' OR pedido.status = 'Finalizado'\n" +
            "GROUP BY produto.id_produto", nativeQuery = true)
    List<?> findByQuantidadeVendidaProduto(long vendedorId);
}
