package tcc.DAOs;

import org.springframework.data.repository.CrudRepository;
import tcc.Models.Tag;

import java.util.List;

/**
 * Created by aline on 22/05/17.
 */
public interface TagDAO extends CrudRepository<Tag, Long> {
    List<Tag> findById(Integer id);
}
