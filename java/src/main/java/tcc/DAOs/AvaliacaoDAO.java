package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Avaliacao;
import tcc.Models.Cliente;
import tcc.Models.Produto;

import java.util.List;

public interface AvaliacaoDAO extends CrudRepository<Avaliacao, Long> {
    List<Avaliacao> findByProduto(Produto produto);
    List<Avaliacao> findByCliente(Cliente cliente);
}
