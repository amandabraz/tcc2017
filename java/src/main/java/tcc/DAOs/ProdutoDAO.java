package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Produto;

import java.util.List;

public interface ProdutoDAO extends CrudRepository <Produto, Long> {
    List<Produto> findById(Long id);
}
