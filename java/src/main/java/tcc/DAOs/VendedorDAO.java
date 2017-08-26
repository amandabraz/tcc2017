package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.List;

/**
 * Created by amanda on 05/05/2017.
 */
public interface VendedorDAO extends CrudRepository<Vendedor, Long> {
    Vendedor findByUsuario(Usuario usuario);
    List<Vendedor> findById(Integer id);
}
