package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.UsuarioDAO;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.Date;

/**
 * Created by amanda on 04/05/2017.
 */

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDAO usuarioDao;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     *
     * @param nome
     * @return
     */
    @RequestMapping("/usuario")
    public ResponseEntity<Usuario> cadastraUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = null;
        try {
            novoUsuario = usuarioDao.save(usuario);
        } catch (Exception ex) {
//            return "Error creating the user: " + ex.toString();
            return new ResponseEntity<Usuario>(novoUsuario, HttpStatus.BAD_REQUEST);
        }
//        return "Vendedor criado com sucesso! (" + novoVendedor.toString() + ")";
        return new ResponseEntity<Usuario>(novoUsuario, HttpStatus.OK);
    }

    }

