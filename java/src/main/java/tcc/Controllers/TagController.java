package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.TagDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Tag;
import tcc.Services.TagService;

/**
 * Created by amanda on 15/08/2017.
 */
@RestController
public class TagController {

    @Autowired
    TagService tagService;

    @RequestMapping(value="/tag", method = RequestMethod.POST)
    public ResponseEntity cadastraTags(@RequestBody Tag tag) {
        Tag tagResolvida = null;
        try {
                tagResolvida = tagService.verificarTag(tag);

        } catch (Exception ex) {
            return new ResponseEntity(new CustomError("Erro ao salvar Tag"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Tag>(tagResolvida, HttpStatus.OK);
    }
}
