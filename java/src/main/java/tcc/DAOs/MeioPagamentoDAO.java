package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.MeioPagamento;

import java.util.List;

/**
 * Created by amanda on 05/05/2017.
 */
public interface MeioPagamentoDAO extends CrudRepository<MeioPagamento, Long> {
    List<MeioPagamento> findAll();
    MeioPagamento findByDescricao(String descricao);
}
