package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Pagamento;

import java.util.List;

/**
 * Created by amanda on 05/05/2017.
 */
public interface PagamentoDAO extends CrudRepository<Pagamento, Long> {
    Pagamento findByDescricao(String descricao);
    List<Pagamento> findAll();
}
