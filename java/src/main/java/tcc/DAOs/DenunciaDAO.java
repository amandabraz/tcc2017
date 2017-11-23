package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Denuncia;

import java.util.List;

/**
 * Created by amanda on 20/11/2017.
 */

public interface DenunciaDAO extends CrudRepository<Denuncia, Long> {
    List<Denuncia> findById(Long id);
}
