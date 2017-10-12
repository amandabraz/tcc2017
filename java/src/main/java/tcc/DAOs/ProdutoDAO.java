package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Produto;

import java.util.List;

public interface ProdutoDAO extends CrudRepository <Produto, Long> {
    List<Produto> findById(Long id);
    List<Produto> findByDeletadoAndNomeIgnoreCaseContaining(boolean deletado, String nome);

    List<Produto> findByDeletadoAndTagsDescricaoIgnoreCaseContaining(boolean deletado, String descricao);

    List<Produto> findByDeletadoAndIngredientesItemIgnoreCaseContaining(boolean deletado, String item);

    List<Produto> findByDeletadoAndRestricoesDieteticasDescricaoIgnoreCaseContaining(boolean deletado, String descricao);

    List<Produto> findByDeletadoAndCategoriaDescricaoIgnoreCaseContaining(boolean deletado, String descricao);

    List<Produto> findByDeletadoAndVendedorNomeFantasiaIgnoreCaseContaining(boolean deletado, String nomeFantasia);

    List<Produto> findByDeletadoAndVendedorIdOrderByDataPreparacaoDesc(boolean deletado, Long id);

    @Query(value = "SELECT * FROM produto\n" +
            "LEFT JOIN produto_tag on produto.id_produto = produto_tag.id_produto\n" +
            "LEFT JOIN cliente_tag on  produto_tag.id_tag = cliente_tag.id_tag\n" +
            "LEFT JOIN tag on produto_tag.id_tag = tag.id_tag\n" +
            "LEFT JOIN produto_restricao on produto.id_produto = produto_restricao.id_produto\n" +
            "LEFT JOIN cliente_restricao on produto_restricao.id_restricao = cliente_restricao.id_restricao\n" +
            "LEFT JOIN restricao_dietetica on produto_restricao.id_restricao = restricao_dietetica.id_restricao\n" +
            "LEFT JOIN produto_ingrediente on produto.id_produto = produto_ingrediente.id_produto\n" +
            "LEFT JOIN ingrediente on produto_ingrediente.id_ingrediente = ingrediente.id_ingrediente\n" +
            "WHERE cliente_tag.id_cliente = ?1 \n" +
            "AND produto.deletado = 0\n" +
            "OR UPPER(tag.descricao) LIKE CONCAT('%', UPPER(produto.nome), '%')\n" +
            "OR UPPER(tag.descricao) LIKE CONCAT('%', UPPER(ingrediente.item), '%')\n" +
            "OR UPPER(tag.descricao) LIKE CONCAT('%', UPPER(restricao_dietetica.descricao), '%')" +
            "GROUP BY produto.id_produto",
            nativeQuery = true)
    List<Produto> findByPreferenciasCliente(Long clienteId);
}
