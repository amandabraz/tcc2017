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

import java.util.List;

/**
 * Created by aline on 17/05/17.
 */
@RestController
public class ClienteController {

    @Autowired
    private ClienteDAO clienteDAO;
    @Autowired
    private UsuarioDAO usuarioDAO;
    @Autowired
    private TagDAO tagDAO;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping("/cliente")
    public ResponseEntity<Cliente> cadastraCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = null;
        try {
            novoCliente = clienteDAO.save(cliente);
        } catch (Exception ex) {
//            return "Error creating the user: " + ex.toString();
            return new ResponseEntity<Cliente>(novoCliente, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Cliente>(novoCliente, HttpStatus.OK);
    }

    @RequestMapping("/tag")
    public String cadastraTag(@RequestParam(value="clienteId") Long clienteId,
                              @RequestParam(value="tags") List<String> tags) {

        Cliente cliente = clienteDAO.findOne(clienteId);
        for (String tag : tags) {
            TagController tagController = new TagController();

            if(tagController.verificarTag(tag)!=null){

                clienteDAO.save(cliente);
            }

            else{
                tagController.cadastraTag(tag);

                List<Tag> tagInseridas = null; // don't know :(
                cliente.setTags(tagInseridas);
                clienteDAO.save(cliente);
            }
        }

        return "Tag para o cliente " + clienteId +
                "criado com sucesso! (" + cliente.toString() + ")";
    }

}






