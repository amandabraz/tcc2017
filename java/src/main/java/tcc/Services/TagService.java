package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.TagDAO;
import tcc.Models.Tag;

@Service
public class TagService {

    @Autowired
    private TagDAO tagDAO;

    public Tag verificarTag(String tag) {
        {
            Tag tagEncontrada = tagDAO.findByDescricao(tag);

            if (tagEncontrada != null) {
                return tagEncontrada;

            } else {
                return cadastraTag(tag);
            }
        }
    }

    public Tag cadastraTag(String tag){

        Tag tagCadastrada = tagDAO.save(new Tag(tag));

        return tagCadastrada;
    }
}
