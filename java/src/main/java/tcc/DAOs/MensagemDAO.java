package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Mensagem;
import tcc.Models.Pedido;

import java.util.List;
import java.util.Set;

/**
 * Created by amanda on 13/11/2017.
 */
public interface MensagemDAO extends CrudRepository<Mensagem, Long> {
    List<Mensagem> findAll();
    Set<Mensagem> findByPedidoOrderByDataMsgAsc(Pedido pedido);
}
