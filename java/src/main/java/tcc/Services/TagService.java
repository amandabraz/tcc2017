package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.TagDAO;
import tcc.Models.Tag;

@Service
public class TagService {

    @Autowired
    private TagDAO tagDAO;

    public Tag verificarTag(Tag tag) {
        {
            Tag tagEncontrada = tagDAO.findByDescricao(tag.getDescricao());

            if (tagEncontrada != null) {
                return tagEncontrada;

            } else {
                return cadastraTag(tag);
            }
        }
    }

    public Tag cadastraTag(Tag tag){

        Tag tagCadastrada = tagDAO.save(tag);

        return tagCadastrada;
    }
}
