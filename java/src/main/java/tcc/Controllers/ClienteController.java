package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcc.DAOs.ClienteDAO;
import tcc.DAOs.TagDAO;
import tcc.DAOs.UsuarioDAO;
import tcc.Models.Cliente;
import tcc.Models.Tag;
import tcc.Services.TagService;

import java.util.List;

@RestController
public class ClienteController {

    @Autowired
    private ClienteDAO clienteDAO;
    @Autowired
    private UsuarioDAO usuarioDAO;
    @Autowired
    private TagDAO tagDAO;

    @Autowired
    TagService tagService;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping("/cliente")
    public ResponseEntity<Cliente> cadastraCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = null;
        try {
            List<Tag> tagsResolvidas = null;
            Tag tagResolvida = null;
            for (Tag t: cliente.getTags()) {
                tagResolvida = tagService.verificarTag(t.getDescricao());
                tagsResolvidas.add(tagResolvida);
            }

            cliente.setTags(tagsResolvidas);
            novoCliente = clienteDAO.save(cliente);
        } catch (Exception ex) {
            return new ResponseEntity<Cliente>(novoCliente, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Cliente>(novoCliente, HttpStatus.OK);
    }
}






