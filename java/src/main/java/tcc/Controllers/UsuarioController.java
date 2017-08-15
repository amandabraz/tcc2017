package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Usuario;

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
    @RequestMapping(value = "/usuario", method = RequestMethod.POST)
    public ResponseEntity cadastraUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = null;
        try {
            CustomError temErro = validaUsuario(usuario);
            if (temErro != null) {
                System.out.println(temErro.toString());
                return new ResponseEntity(temErro, HttpStatus.CONFLICT);
            }
            novoUsuario = usuarioDao.save(usuario);
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(ex);
        }
        return new ResponseEntity<>(novoUsuario, HttpStatus.OK);
    }

    private CustomError validaUsuario(Usuario usuario) {
        Usuario usuarioBuscado = usuarioDao.findByEmail(usuario.getEmail());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            return new CustomError("E-mail já cadastrado!");
        }
        usuarioBuscado = usuarioDao.findByCpf(usuario.getCpf());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            return new CustomError("CPF já cadastrado!");
        }
        usuarioBuscado = usuarioDao.findByDddAndTelefone(usuario.getDdd(), usuario.getTelefone());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            return new CustomError("Celular já cadastrado!");
        }
        return null;
    }

}

