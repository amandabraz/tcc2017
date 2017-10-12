package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
import java.util.List;
import java.util.Objects;
import java.util.Set;

@RestController
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private TagService tagService;

    @Autowired
    private IngredienteService ingredienteService;

    @Transactional
    @RequestMapping(value = "/produto", method = RequestMethod.POST)
    public ResponseEntity cadastraProduto(@RequestBody Produto produto) {
        try {
            verificarTags(produto);
            verificarIngredientes(produto);
            Produto novoProduto = produtoService.salvaProduto(produto);
            if (novoProduto != null) {
                return new ResponseEntity<>(novoProduto.getId(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Erro ao salvar Produto"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar Produto"), HttpStatus.BAD_REQUEST);
        }
    }

    private void verificarIngredientes(@RequestBody Produto produto) {
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

    private void verificarTags(@RequestBody Produto produto) {
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

    @Transactional
    @RequestMapping(value = "/produto", method = RequestMethod.GET)
    public ResponseEntity buscaProdutos(@RequestParam(value = "filtro") String filtro,
                                        @RequestParam(value = "latitude") double latitude,
                                        @RequestParam(value = "longitude") double longitude,
                                        @RequestParam(value = "altitude") double altitude) {
        try {

            return new ResponseEntity<List<Produto>>(produtoService.encontraProduto(filtro, latitude, longitude, altitude), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar Produtos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/vendedor/{idVendedor}/produto", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscaProdutosPorVendedor(@PathVariable("idVendedor") Long idVendedor) {
        try {
            return new ResponseEntity<List<Produto>>(produtoService.buscaProdutosPorVendedor(idVendedor), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar Produtos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/vendedor/{idVendedor}/produto/{idProduto}", method = RequestMethod.DELETE)
    public ResponseEntity deletaProduto(@PathVariable("idVendedor") Long idVendedor,
                                        @PathVariable("idProduto") Long idProduto) {
        try {
            Produto produtoDeletado = produtoService.deletaProduto(idVendedor, idProduto);
            return new ResponseEntity<Produto>(produtoDeletado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao deletar Produto"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/vendedor/{idVendedor}/produto/{idProduto}/qtd/{qtdProduto}", method = RequestMethod.PUT)
    public ResponseEntity alteraQuantidadeProduto(@PathVariable("idVendedor") Long idVendedor,
                                                  @PathVariable("idProduto") Long idProduto,
                                                  @PathVariable("qtdProduto") int qtdProduto) {
        try {
            Produto produtoAtualizado = produtoService.alteraQuantidadeProduto(idVendedor, idProduto, qtdProduto);
            return new ResponseEntity<Produto>(produtoAtualizado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao alterar quantidade do Produto"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/produto/{idProduto}", method = RequestMethod.GET)
    public ResponseEntity encontraProduto(@PathVariable("idProduto") Long idProduto) {
        try {
            Produto produtoEncontrado = produtoService.buscaProduto(idProduto);
            return new ResponseEntity<Produto>(produtoEncontrado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar o produto"), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/produto", method = RequestMethod.PUT)
    public ResponseEntity editaProduto(@RequestBody Produto produto) {
        try {
            verificarTags(produto);
            verificarIngredientes(produto);
            Produto produtoEditado = produtoService.editaProduto(produto);
            if (Objects.isNull(produtoEditado)) {
                return new ResponseEntity<>(new CustomError("Erro ao salvar o produto"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(produtoEditado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na edição do produto! Tente novamente");
        }
    }

    @Transactional
    @RequestMapping(value = "/produto/cliente/{clienteId}", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscaProdutosPorPreferenciasCliente(@PathVariable("clienteId") Long clienteId) {
        try {
            return new ResponseEntity<List<Produto>>(produtoService.buscaProdutosPorPreferenciasCliente(clienteId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar Produtos"), HttpStatus.BAD_REQUEST);
        }
    }
}
