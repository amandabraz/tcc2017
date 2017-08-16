package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcc.DAOs.ClienteDAO;
import tcc.DAOs.TagDAO;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Cliente;
import tcc.Models.Tag;
import tcc.Services.TagService;

import java.util.List;

@RestController
public class ClienteController {

    @Autowired
    private ClienteDAO clienteDAO;



    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping(value="/cliente", method = RequestMethod.POST)
    public ResponseEntity cadastraCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = null;
        try {
            novoCliente = clienteDAO.save(cliente);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar Cliente"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Cliente>(novoCliente, HttpStatus.OK);
    }
}






