package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.List;

/**
 * Created by amanda on 05/05/2017.
 */
public interface VendedorDAO extends CrudRepository<Vendedor, Long> {
    List<Vendedor> findById(Integer id);
    Vendedor findByUsuario(Usuario usuario);

}
