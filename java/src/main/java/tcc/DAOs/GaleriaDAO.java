package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Galeria;
import tcc.Models.Produto;

import java.util.List;

public interface GaleriaDAO extends CrudRepository<Galeria, Long> {
    List<Galeria> findByProduto(Produto produto);
}
