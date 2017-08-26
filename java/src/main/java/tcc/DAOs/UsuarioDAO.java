package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tcc.Models.Usuario;

import java.util.List;

@Repository
public interface UsuarioDAO extends CrudRepository<Usuario, Long> {

    Usuario findUsuarioByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);

    Iterable<Usuario> findUsuarioByNome(@Param("nome") String nome);

    Usuario findUsuarioById(@Param("id") Long id);

    Usuario findByEmail(String email);

    Usuario findByCpf(String cpf);

    Usuario findByDddAndTelefone(String ddd, String telefone);
}
