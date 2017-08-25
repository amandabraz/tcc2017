package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Produto;
import tcc.Models.Tag;
import tcc.Services.ProdutoService;
import tcc.Services.TagService;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@RequestMapping(value = "/produto")
@RestController
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private TagService tagService;

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraProduto(@RequestBody Produto produto) {
        try {
            if (!produto.getTags().isEmpty()) {
                Set<Tag> tagsSalvas = new HashSet<>();
                Tag tagSalva;
                for (Tag tagProposta : produto.getTags()) {
                    tagSalva = tagService.verificarTag(tagProposta);
                    if (tagSalva != null) {
                        tagsSalvas.add(tagSalva);
                    }
                }
                if (!tagsSalvas.isEmpty()) {
                    produto.setTags(tagsSalvas);
                }
            }
            Produto novoProduto = produtoService.salvaProduto(produto);
            return new ResponseEntity<>(novoProduto.getId(), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.fillInStackTrace());
            return new ResponseEntity<>(new CustomError("Erro ao salvar Produto"), HttpStatus.BAD_REQUEST);
        }
    }
}
