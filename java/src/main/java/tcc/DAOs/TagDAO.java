package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Tag;

/**
 * Created by aline on 22/05/17.
 */
public interface TagDAO extends CrudRepository<Tag, Long> {
    Tag findByDescricao(String descricao);
}
