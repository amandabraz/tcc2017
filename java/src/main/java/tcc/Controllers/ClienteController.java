package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcc.DAOs.ClienteDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Cliente;
import tcc.Models.Tag;
import tcc.Services.ClienteService;
import tcc.Services.TagService;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@RestController
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
    @RequestMapping(value="/cliente", method = RequestMethod.POST)
    public ResponseEntity cadastraCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = null;
        try {
            if (!cliente.getTags().isEmpty()) {
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
            }
            novoCliente = clienteService.salvaCliente(cliente);
        } catch (Exception ex) {
            System.out.println(ex.fillInStackTrace());
            return new ResponseEntity<>(new CustomError("Erro ao salvar Cliente"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(novoCliente.getId(), HttpStatus.OK);
    }
}






