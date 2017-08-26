package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;
import tcc.Models.Usuario;

import java.util.List;

public interface ClienteDAO extends CrudRepository<Cliente, Long> {
    List<Cliente> findById(Integer id);
    Cliente findByUsuario(Usuario usuario);
}
