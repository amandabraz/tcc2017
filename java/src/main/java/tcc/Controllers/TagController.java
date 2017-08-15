package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.TagDAO;
import tcc.Models.Tag;

@RestController
public class TagController {

    @Autowired
    private TagDAO tagDAO;

    public Tag verificarTag(String tags) {
        {
            if(tagDAO.findByDescricao(tags)!=null){
                Tag tag1 = null;
                tag1.getId();

                return tag1;
            }
            return null;
        }
    }

    public Tag cadastraTag(String tags){
        Tag tag = new Tag(tags);
        tagDAO.save(tag);

        tag.getId();
        return tag;
    }
}
