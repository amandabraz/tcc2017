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
            "AND pedido.status = 'Finalizado'\n" +
            "GROUP BY produto.id_produto", nativeQuery = true)
    List<?> findByQuantidadeVendidaProduto(long vendedorId);

    @Query(value = "select produto.nome as nomeProduto, ROUND(SUM(pedido.valor_compra), 2) as valorTotalVendido from pedido\n" +
            "    JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "    WHERE produto.fk_vendedor = ?1\n" +
            "    AND pedido.status = 'Finalizado'\n" +
            "    AND pedido.data_finalizacao BETWEEN DATE_SUB(NOW(), INTERVAL ?2 DAY) and DATE_SUB(NOW(), INTERVAL 0 DAY)\n" +
            "    GROUP BY produto.id_produto;", nativeQuery = true)
    List<?> findByValorTotalVendaPedidos(Long vendedorId, Integer diasParaBusca);
    
    @Query(value = "SELECT SUM(nota) from pedido WHERE fk_produto = ?1 AND nota > 0 AND status = 'Finalizado'",
            countQuery = "SELECT COUNT(nota) from pedido WHERE fk_produto = ?1 AND nota > 0 AND status = 'Finalizado'",
            countName = "countSelectSomaNotasPorProduto",
            nativeQuery = true)
    long selectSomaNotasPorProduto(long produtoId);

    @Query(value = "SELECT COUNT(nota) from pedido WHERE fk_produto = ?1 AND nota > 0 AND status = 'Finalizado'",
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

    @Query(value = "SELECT usuario.nome as nomeVendedor, produto.nome as nomeProduto, SUM(pedido.quantidade) as quantidadeVendida, produto.imagem_principal from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "JOIN vendedor on vendedor.id_vendedor = produto.fk_vendedor\n" +
            "JOIN usuario on usuario.id_usuario = vendedor.fk_usuario\n" +
            "WHERE pedido.data_finalizacao >= ?1 \n" +
            "AND usuario.bloqueado = 0 " +
            "AND usuario.deletado = 0 " +
            "AND pedido.status = 'Finalizado'\n" +
            "GROUP BY produto.id_produto \n" +
            "ORDER BY 3 DESC \n" +
            "LIMIT 10", nativeQuery = true)
    List<?> findByProdutosMaisVendidos(Date filtroMensal);

    @Query(value = "SELECT SUM(pedido.quantidade) as quantidadeVendida from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "WHERE pedido.data_finalizacao >= ?1 \n" +
            "AND pedido.status = 'Finalizado'", nativeQuery = true)
    List<?> findByQuantidadeProdutosVendidos(Date filtroMensal);

    @Query(value = "SELECT COUNT(*) as quantidadeVendas from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "WHERE pedido.data_finalizacao >= ?1 \n" +
            "AND pedido.status = 'Finalizado'", nativeQuery = true)
    List<?> findByQuantidadeVendas(Date filtroMensal);

    @Query(value = "SELECT COUNT(DISTINCT pedido.fk_cliente) as quantidadeClientes from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "JOIN cliente on cliente.id_cliente = pedido.fk_cliente\n" +
            "WHERE pedido.data_finalizacao >= ?1 \n" +
            "AND pedido.status = 'Finalizado'", nativeQuery = true)
    List<?> findByQuantidadeClientes(Date filtroMensal);

    @Query(value = "SELECT usuario.nome as nomeVendedor, SUM(pedido.quantidade) as quantidadeVendida, usuario.imagem_perfil from pedido\n" +
            "JOIN produto on produto.id_produto = pedido.fk_produto\n" +
            "JOIN vendedor on vendedor.id_vendedor = produto.fk_vendedor\n" +
            "JOIN usuario on usuario.id_usuario = vendedor.fk_usuario\n" +
            "WHERE pedido.data_finalizacao >= ?1 \n" +
            "AND usuario.bloqueado = 0 " +
            "AND usuario.deletado = 0 " +
            "AND pedido.status = 'Finalizado'\n" +
            "GROUP BY produto.fk_vendedor \n" +
            "ORDER BY 2 DESC \n" +
            "LIMIT 10", nativeQuery = true)
    List<?> findByMaioresVendedores(Date filtroMensal);

    int countByClienteId(Long id);

    int countByNotaGreaterThanAndClienteId(Integer numero, Long id);

    List<Pedido> findByProdutoIdAndDataAvaliadoNotNull(Long id);
}
