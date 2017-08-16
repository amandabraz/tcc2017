package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tcc.Models.Usuario;

import java.util.List;

@Repository
public interface UsuarioDAO extends CrudRepository<Usuario, Long> {

//    @Query("select u from Usuario u where u.email = :email")
    Usuario findUsuarioByEmail(@Param("email") String email);

    Iterable<Usuario> findUsuarioByNome(@Param("nome") String nome);

    Usuario findUsuarioById(@Param("id") Long id);

    Usuario findByDddAndTelefone(int ddd, String telefone);
}
