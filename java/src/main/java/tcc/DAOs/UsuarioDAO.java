package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tcc.Models.Usuario;

@Repository
public interface UsuarioDAO extends CrudRepository<Usuario, Long> {

//    @Query("select u from Usuario u where u.email = :email")
    Usuario findUserByEmail(@Param("email") String email);

    Usuario findByDddAndTelefone(int ddd, String telefone);
}
