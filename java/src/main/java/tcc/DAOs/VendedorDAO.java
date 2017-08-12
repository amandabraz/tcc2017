package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Vendedor;

import java.util.List;

/**
 * Created by amanda on 05/05/2017.
 */
public interface VendedorDAO extends CrudRepository<Vendedor, Long> {
    List<Vendedor> findByNomeFantasia(String nomeFantasia);
}