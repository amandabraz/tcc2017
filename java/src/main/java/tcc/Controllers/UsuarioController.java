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
     * @param usuario
     * @return
     */
    @RequestMapping("/usuario")
    public ResponseEntity cadastraUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = null;
        try {
            validaUsuario(usuario);
            novoUsuario = usuarioDao.save(usuario);
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(ex.getMessage());
        }
        return new ResponseEntity<Usuario>(novoUsuario, HttpStatus.OK);
    }

    private void validaUsuario(Usuario usuario) throws Exception {
        Usuario usuarioBuscado = usuarioDao.findByEmail(usuario.getEmail());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            throw new Exception("E-mail já cadastrado!");
        }
        usuarioBuscado = usuarioDao.findByCpf(usuario.getCpf());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            throw new Exception("CPF já cadastrado!");
        }
        usuarioBuscado = usuarioDao.findByDddAndTelefone(usuario.getDdd(), usuario.getTelefone());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            throw new Exception("Celular já cadastrado!");
        }
    }

}

