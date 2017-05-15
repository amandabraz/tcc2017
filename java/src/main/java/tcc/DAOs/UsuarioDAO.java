package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Usuario;

import java.util.List;

/**
 * Created by amanda on 05/05/2017.
 */
public interface UsuarioDAO extends CrudRepository<Usuario, Long> {
    List<Usuario> findByEmail(String email);
}
