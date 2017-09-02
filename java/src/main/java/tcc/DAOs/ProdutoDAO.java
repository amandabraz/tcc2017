package tcc.DAOs;

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

    List<Produto> findByDeletadoAndVendedorId(boolean deletado, Long id);
}
