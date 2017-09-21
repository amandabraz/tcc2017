package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.TagDAO;
import tcc.Models.Tag;

import javax.transaction.Transactional;
import java.util.Objects;

@Service
public class TagService {

    @Autowired
    private TagDAO tagDAO;

    public Tag verificarTag(Tag tag) {
        try {
            Tag tagEncontrada = tagDAO.findByDescricao(tag.getDescricao());
            if (Objects.nonNull(tagEncontrada)) return tagEncontrada;
            return cadastraTag(tag);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Tag cadastraTag(Tag tag) {
        Tag tagCadastrada;
        try {
            tagCadastrada = tagDAO.save(tag);
        } catch (Exception e) {
            throw e;
        }
        return tagCadastrada;
    }

    public Tag buscaTag(Long id) {
        try {
            return tagDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }
}
