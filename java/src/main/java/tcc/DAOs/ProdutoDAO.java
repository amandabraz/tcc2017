package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Produto;

import java.util.List;

public interface ProdutoDAO extends CrudRepository <Produto, Long> {
    List<Produto> findById(Long id);
    List<Produto> findByNomeIgnoreCaseContaining(String nome);

    List<Produto> findByTagsDescricaoIgnoreCaseContaining(String descricao);
    List<Produto> findByIngredientesItemIgnoreCaseContaining(String item);
    List<Produto> findByRestricoesDieteticasDescricaoIgnoreCaseContaining(String descricao);
    List<Produto> findByCategoriaDescricaoIgnoreCaseContaining(String descricao);
    List<Produto> findByVendedorNomeFantasiaIgnoreCaseContaining(String nomeFantasia);
}
