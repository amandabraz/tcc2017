package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Categoria;

import java.util.List;

/**
 * Created by larissa on 24/05/17.
 */
public interface CategoriaDAO extends CrudRepository <Categoria, Long> {
    List<Categoria> findById(Long id);
}
