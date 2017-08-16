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
    @RequestMapping(value = "/usuario/email/{email:.+}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity buscaTipoPerfilUsuarioPorEmail(@PathVariable("email") String email){
        Character type;
        try{
            Usuario usuarioBd = usuarioDao.findUsuarioByEmailUser(email);
            return new ResponseEntity<Character>(Character.valueOf(usuarioBd.getPerfil()), HttpStatus.OK);
        }catch(NullPointerException | IndexOutOfBoundsException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail não encontrado!");
        }
    }

    /**
     * Retorna Usuário de acordo com o id dele.
     * @param id id do Usuário a ser buscado.
     * @return Character usuarioBd se o usuário for encontrado de acordo com o id.
     *          Erro    se o id não estiver cadastrado.
     */
    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity buscaUsuario(@PathVariable("id") Long id){
        Character type;
        try{
            Usuario usuarioBd = usuarioDao.findUsuarioById(id);
            if(usuarioBd.getId().equals(id)){
                return new ResponseEntity<Usuario>((usuarioBd), HttpStatus.OK);
            }
        }catch(NullPointerException | IndexOutOfBoundsException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na busca do Usuário! Tente novamente");
    }

    /**
     * Retorna lista de Usuários dado determinado nome.
     * @param nome nome do(s) Usuário(s) a ser(em) buscado(s).
     * @return Character usuarioBd se um ou mais Usuários forem encontrados de acordo com o nome.
     *          Erro    se o nome não estiver cadastrado.
     */
    @RequestMapping(value = "/usuario/nome/{nome}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity buscaPerfilUsuarioPorNome(@PathVariable("nome") String nome){
        Character type;
        try{
            return new ResponseEntity<Iterable<Usuario>>(usuarioDao.findUsuarioByNome(nome), HttpStatus.OK);
        }catch(NullPointerException | IndexOutOfBoundsException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
        }
    }

}

