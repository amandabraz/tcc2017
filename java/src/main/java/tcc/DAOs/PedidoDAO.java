package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Pedido;

import java.util.List;

public interface PedidoDAO extends CrudRepository<Pedido, Long>{
    List<Pedido> findById(Long Id);
}
