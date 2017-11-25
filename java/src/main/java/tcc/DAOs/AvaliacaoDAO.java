package tcc.DAOs;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Avaliacao;

import java.util.List;

public interface AvaliacaoDAO extends CrudRepository<Avaliacao, Long> {
    List<Avaliacao> findAll();
    List<Avaliacao> findByReceiverOrderByDataAvaliacaoAsc(Long receiver);

    @Query(value = "SELECT SUM(nota) from avaliacao WHERE ID_RECEIVER = ?1 AND nota > 0",
            countQuery = "SELECT COUNT(nota) from avaliacao WHERE ID_RECEIVER = ?1 AND nota > 0",
            countName = "countSelectSomaNotasPorUsuario",
            nativeQuery = true)
    long selectSomaNotasPorUsuario(long reciver_id);

    @Query(value = "SELECT COUNT(nota) from avaliacao WHERE ID_RECEIVER = ?1 AND nota > 0",
            nativeQuery = true)
    long countNotasPorUsuario(long reciver_id);
}
