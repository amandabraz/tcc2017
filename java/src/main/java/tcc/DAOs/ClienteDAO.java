package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Cliente;

import java.util.List;

/**
 * Created by aline on 17/05/17.
 */
public interface ClienteDAO extends CrudRepository<Cliente, Long>
{
    List<Cliente> findById(Integer id);
}
