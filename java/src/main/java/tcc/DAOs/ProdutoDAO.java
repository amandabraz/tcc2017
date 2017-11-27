package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Produto;

import java.util.Date;
import java.util.List;

public interface ProdutoDAO extends CrudRepository <Produto, Long> {
    List<Produto> findById(Long id);

    List<Produto> findByDeletadoAndNomeIgnoreCaseContainingAndQuantidadeGreaterThan(boolean deletado, String nome, int qtdMinima);

    List<Produto> findByDeletadoAndTagsDescricaoIgnoreCaseContainingAndQuantidadeGreaterThan(boolean deletado, String descricao, int qtdMinima);

    List<Produto> findByDeletadoAndIngredientesItemIgnoreCaseContainingAndQuantidadeGreaterThan(boolean deletado, String item, int qtdMinima);

    List<Produto> findByDeletadoAndRestricoesDieteticasDescricaoIgnoreCaseContainingAndQuantidadeGreaterThan(boolean deletado, String descricao, int qtdMinima);

    List<Produto> findByDeletadoAndCategoriaDescricaoIgnoreCaseContainingAndQuantidadeGreaterThan(boolean deletado, String descricao, int qtdMinima);

    List<Produto> findByDeletadoAndVendedorNomeFantasiaIgnoreCaseContainingAndQuantidadeGreaterThan(boolean deletado, String nomeFantasia, int qtdMinima);

    List<Produto> findByDeletadoAndVendedorIdAndQuantidadeGreaterThanOrderByDataPreparacaoDesc(boolean deletado, Long id, int qtdMinima);

    @Query(value = "SELECT * FROM produto\n" +
            "LEFT JOIN produto_tag on produto.id_produto = produto_tag.id_produto\n" +
            "LEFT JOIN cliente_tag on  produto_tag.id_tag = cliente_tag.id_tag\n" +
            "LEFT JOIN tag on produto_tag.id_tag = tag.id_tag\n" +
            "LEFT JOIN produto_restricao on produto.id_produto = produto_restricao.id_produto\n" +
            "LEFT JOIN cliente_restricao on produto_restricao.id_restricao = cliente_restricao.id_restricao\n" +
            "LEFT JOIN restricao_dietetica on produto_restricao.id_restricao = restricao_dietetica.id_restricao\n" +
            "LEFT JOIN produto_ingrediente on produto.id_produto = produto_ingrediente.id_produto\n" +
            "LEFT JOIN ingrediente on produto_ingrediente.id_ingrediente = ingrediente.id_ingrediente\n" +
            "WHERE (cliente_tag.id_cliente = ?1 \n" +
            "AND produto.deletado = 0\n" +
            "OR UPPER(tag.descricao) LIKE CONCAT('%', UPPER(produto.nome), '%')\n" +
            "OR UPPER(tag.descricao) LIKE CONCAT('%', UPPER(ingrediente.item), '%')\n" +
            "OR UPPER(tag.descricao) LIKE CONCAT('%', UPPER(restricao_dietetica.descricao), '%')) \n" +
            "AND produto.quantidade > 0 \n" +
            "AND produto.deletado = 0 \n" +
            "GROUP BY produto.id_produto",
            nativeQuery = true)
    List<Produto> findByPreferenciasCliente(Long clienteId);

    @Query(value = "SELECT produto.id_produto as idProduto, produto.nome as nomeProduto, pedido.comentario_avaliacao as comentrioAvaliacao from produto\n" +
            "JOIN pedido on pedido.fk_produto = produto.id_produto\n" +
            "ORDER BY pedido.data_avaliado DESC \n", nativeQuery = true)
    List<Produto> findByComentariosProdutoAvaliado(Long id);
}
