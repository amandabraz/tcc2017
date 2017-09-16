package tcc.DAOs;


import org.springframework.data.repository.CrudRepository;
import tcc.Models.Localizacao;
import tcc.Models.Usuario;

import java.util.List;

public interface LocalizacaoDAO extends CrudRepository<Localizacao, Long>{
    List<Localizacao> findByUsuario(Usuario usuario);

}
