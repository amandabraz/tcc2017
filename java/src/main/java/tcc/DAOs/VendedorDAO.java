package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.List;

public interface VendedorDAO extends CrudRepository<Vendedor, Long> {
    List<Vendedor> findById(Integer id);
    Vendedor findByUsuario(Usuario usuario);
    List<Vendedor> findByUsuarioNomeIgnoreCaseContaining(String nome);
    List<Vendedor> findByNomeFantasiaIgnoreCaseContaining(String nomeFantasia);

}
