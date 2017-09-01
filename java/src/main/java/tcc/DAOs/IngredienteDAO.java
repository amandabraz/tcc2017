package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Ingrediente;

import java.util.List;

/**
 * Created by larissa on 24/05/17.
 */
public interface IngredienteDAO extends CrudRepository <Ingrediente, Long> {
    List<Ingrediente> findById(Long id);
    Ingrediente findByItem(String item);
}
