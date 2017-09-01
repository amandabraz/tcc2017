package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Cliente;
import tcc.Models.Tag;
import tcc.Models.Usuario;
import tcc.Services.ClienteService;
import tcc.Services.TagService;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value="/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private TagService tagService;


    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = null;
        try {
            Set<Tag> tagsSalvas = new HashSet<>();
            Tag tagSalva;
            for (Tag tagProposta : cliente.getTags()) {
                tagSalva = tagService.verificarTag(tagProposta);
                if (tagSalva != null) {
                    tagsSalvas.add(tagSalva);
                }
            }
            if (!tagsSalvas.isEmpty()) {
                cliente.setTags(tagsSalvas);
            }
            novoCliente = clienteService.salvaCliente(cliente);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar Cliente"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(novoCliente.getId(), HttpStatus.OK);
    }

    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscaClientePorUsuario(@PathVariable("id") Long usuarioId) {
        try {
            Usuario usuario = new Usuario(usuarioId);
            Cliente cliente = clienteService.buscaClientePorUsuario(usuario);
            return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao carregar dados do cliente"), HttpStatus.NOT_FOUND);
        }
    }
}






