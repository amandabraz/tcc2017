package tcc.DAOs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tcc.Models.Tag;

import java.util.List;

/**
 * Created by aline on 22/05/17.
 */
public interface TagDAO extends JpaRepository<Tag, Long> {
    Tag findByDescricao(String descricao);
}
