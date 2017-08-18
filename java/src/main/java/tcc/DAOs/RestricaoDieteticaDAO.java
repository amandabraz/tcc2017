package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.RestricaoDietetica;

import java.util.List;

public interface RestricaoDieteticaDAO extends CrudRepository<RestricaoDietetica,Long> {
    List<RestricaoDietetica> findAll();
}
