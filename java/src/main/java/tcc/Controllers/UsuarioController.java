package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.Date;
import java.util.List;

/**
 * Created by amanda on 04/05/2017.
 */

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDAO usuarioDao;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     */
    @RequestMapping(value = "/usuario", method = RequestMethod.POST)
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

    /**
     * Retorna todos os usuários salvos no banco.
     * @return todos os usuários salvos no banco.
     */
    @RequestMapping(value = "/usuario", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Usuario>> buscaUsuarios() {
        return new ResponseEntity<Iterable<Usuario>>(usuarioDao.findAll(), HttpStatus.OK);
    }

    /**
     * Busca o tipo de Usuário de acordo com o e-mail dele.
     * @param email e-mail do Usuário a ser buscado.
     * @return Character usuarioBd se o usuário for encontrado de acordo com o e-mail.
     *          Erro    se o email não estiver cadastrado.
     */
    @RequestMapping(value = "/usuario/email={email}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity buscaPerfilUsuario(@PathVariable("email") String email){
        Character type;
        List<Usuario> usuarios;
        try{
//            usuarios = usuarioDao.findByEmail(email);
            Usuario usuarioBd = usuarioDao.findUserByEmail(email);//usuarios.get(0);
            if(usuarioBd.getEmail().equals(email)){
                return new ResponseEntity<Character>(Character.valueOf(usuarioBd.getPerfil()), HttpStatus.OK);
            }
        }catch(NullPointerException | IndexOutOfBoundsException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail não encontrado!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na busca do e-mail! Tente novamente");
    }

}

