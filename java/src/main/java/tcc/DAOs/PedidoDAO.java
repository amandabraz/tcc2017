package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;
import tcc.Models.Pedido;

import java.util.Date;
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

    Pedido findFirstByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(String status, long vendedorId);

    List<Pedido> findByStatusAndProdutoVendedorIdOrderByDataSolicitadaDesc(String status, long vendedorId);

    @Query(value = "SELECT * FROM pedido\n" +
            "JOIN produto on pedido.fk_produto = produto.id_produto\n" +
            "WHERE pedido.fk_cliente = ?1 \n" +
            "ORDER BY FIELD(status, 'Solicitado', 'Confirmado', 'Finalizado', 'Recusado', 'Cancelado')",
            nativeQuery = true)
    List<Pedido> findByProdutoClienteIdOrderByStatus(long clienteId);

    List<Pedido> findByStatusAndClienteIdOrderByDataSolicitadaDesc(String status, long clienteId);

    @Query(value = "SELECT produto.nome, SUM(pedido.quantidade) as qtd_vendida from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.status != 'Recusado' AND pedido.status != 'Cancelado'\n" +
            "GROUP BY produto.id_produto", nativeQuery = true)
    List<?> findByQuantidadeVendidaProduto(long vendedorId);

    @Query(value = "select produto.nome as nomeProduto, ROUND(SUM(pedido.valor_compra), 2) as valorTotalVendido from pedido\n" +
            "    JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "    WHERE produto.fk_vendedor = ?1\n" +
            "    AND pedido.status = 'Finalizado'\n" +
            "    AND pedido.data_finalizacao BETWEEN DATE_SUB(NOW(), INTERVAL ?2 DAY) and DATE_SUB(NOW(), INTERVAL 0 DAY)\n" +
            "    GROUP BY produto.id_produto;", nativeQuery = true)
    List<?> findByValorTotalVendaPedidos(Long vendedorId, Integer diasParaBusca);
    
    @Query(value = "SELECT SUM(nota) from pedido WHERE fk_produto = ?1",
            countQuery = "SELECT COUNT(nota) from pedido WHERE fk_produto = ?1",
            countName = "countSelectSomaNotasPorProduto",
            nativeQuery = true)
    long selectSomaNotasPorProduto(long produtoId);

    @Query(value = "SELECT COUNT(nota) from pedido WHERE fk_produto = ?1",
            nativeQuery = true)
    long countNotasPorProduto(long produtoId);
    
    @Query(value = "SELECT SUM(pedido.quantidade) as qtd_vendida from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.data_finalizacao >= ?2 \n" +
            "AND pedido.status = 'Finalizado'\n", nativeQuery = true)
    Integer findByQtdVendida(long vendedorId, Date filtroMensal);

    @Query(value = "SELECT COUNT(DISTINCT pedido.fk_cliente) as n_clientes from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.data_finalizacao >= ?2 \n" +
            "AND pedido.status = 'Finalizado'\n", nativeQuery = true)
    int findByQtdClientes(long vendedorId, Date filtroMensal);

    @Query(value = "SELECT ROUND(SUM(pedido.valor_compra), 2) as valor from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.data_finalizacao >= ?2 \n" +
            "AND pedido.status = 'Finalizado'\n", nativeQuery = true)
    Float findByQtdTotal(long vendedorId, Date filtroMensal);

    @Query(value = "SELECT ROUND(SUM(pedido.valor_compra) / count(pedido.fk_cliente),2) AS ticket from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.data_finalizacao >= ?2 \n" +
            "AND pedido.status = 'Finalizado'\n", nativeQuery = true)
    Float findByTicketMedio(long vendedorId, Date filtroMensal);

    @Query(value = "SELECT COUNT(DISTINCT pedido.fk_cliente) as n_clientes from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE produto.fk_vendedor = ?1 \n"+
            "AND pedido.data_finalizacao >= ?2 \n" +
            "AND pedido.status = 'Finalizado'\n" +
            "GROUP BY pedido.fk_cliente\n" +
            "HAVING COUNT(n_clientes)>1", nativeQuery = true)
    Integer findByQtdClientesConquistados(long vendedorId, Date filtroMensal);

    @Query(value = "SELECT produto.nome, SUM(pedido.quantidade) as qtd_vendida from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n"+
            "WHERE pedido.data_finalizacao = ?1 \n"+
            "AND pedido.status = 'Finalizado'\n" +
            "GROUP BY produto.id_produto \n" +
            "ORDER BY 2 DESC \n" +
            "LIMIT 10", nativeQuery = true)
    List<?> findByProdutosMaisVendidos(Date filtroMensal);
}
