package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.UsuarioDAO;
import tcc.Models.Usuario;

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
     * @param nome
     * @return
     */
    @RequestMapping("/usuario")
    public String cadastraUsuario(@RequestParam(value="nome") String nome,
                                   @RequestParam(value="perfil") char perfil,
                                   @RequestParam(value="email") String email,
                                   @RequestParam(value="dataNasc") Date dataNasc) {
        Usuario novoUsuario = null;
        try {
            novoUsuario = new Usuario(false, perfil, nome, email, dataNasc,
                    false, false);
            // Setando deletado como false pois está sendo inserido no banco neste momento
            // Setando localizacao e notificacao como false pois usuário ainda não foi solicitado essas preferências
            usuarioDao.save(novoUsuario);
        } catch (Exception ex) {
            return "Error creating the user: " + ex.toString();
        }
        return "Usuario criado com sucesso! (" + novoUsuario.toString() + ")";
    }
}
