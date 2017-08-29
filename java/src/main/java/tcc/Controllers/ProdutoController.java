package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Ingrediente;
import tcc.Models.Produto;
import tcc.Models.Tag;
import tcc.Services.IngredienteService;
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

    @Autowired
    private IngredienteService ingredienteService;

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
            if (!produto.getIngredientes().isEmpty()) {
                Set<Ingrediente> ingredientesSalvos = new HashSet<>();
                Ingrediente ingredienteSalvo;
                for (Ingrediente ingredienteProposto : produto.getIngredientes()) {
                    ingredienteSalvo = ingredienteService.verificarIngrediente(ingredienteProposto);
                    if (ingredienteSalvo != null) {
                        ingredientesSalvos.add(ingredienteSalvo);
                    }
                }
                if (!ingredientesSalvos.isEmpty()) {
                    produto.setIngredientes(ingredientesSalvos);
                }
            }
            Produto novoProduto = produtoService.salvaProduto(produto);
            if (novoProduto != null) {
                return new ResponseEntity<>(novoProduto.getId(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Erro ao salvar Produto"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            System.out.println(e.fillInStackTrace());
            return new ResponseEntity<>(new CustomError("Erro ao salvar Produto"), HttpStatus.BAD_REQUEST);
        }
    }
}
