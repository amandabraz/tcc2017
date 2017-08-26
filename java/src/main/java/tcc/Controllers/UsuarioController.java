package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Usuario;
import tcc.Services.UsuarioService;

/**
 * Created by amanda on 04/05/2017.
 */

@RequestMapping(value = "/usuario")
@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDAO usuarioDao;

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     *
     * @param usuario
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraUsuario(@RequestBody Usuario usuario) {

        Usuario novoUsuario = null;
        try {
            CustomError temErro = usuarioService.validaUsuario(usuario);
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

    /**
     * Retorna todos os usuários salvos no banco.
     * @return todos os usuários salvos no banco.
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Iterable<Usuario>> buscaUsuarios() {
        return new ResponseEntity<Iterable<Usuario>>(usuarioDao.findAll(), HttpStatus.OK);
    }

    /**
     * Busca o tipo de Usuário de acordo com o e-mail dele.
     * @param email e-mail do Usuário a ser buscado.
     * @return Character usuarioBd se o usuário for encontrado de acordo com o e-mail.
     *          Erro    se o email não estiver cadastrado.
     */

    @RequestMapping(value = "/email/{email:.+}/{senha}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity buscaTipoPerfilUsuarioPorEmail(@PathVariable("email") String email, @PathVariable("senha") String senha){
        Character type;
        try{
            Usuario usuarioBd = usuarioDao.findUsuarioByEmailAndSenha(email, senha);
            return new ResponseEntity<Usuario>(usuarioBd, HttpStatus.OK);
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
        try {
            Usuario usuarioBd = usuarioDao.findUsuarioById(id);
            return new ResponseEntity<Usuario>((usuarioBd), HttpStatus.OK);
        } catch (NullPointerException | IndexOutOfBoundsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na busca do Usuário! Tente novamente");
        }
    }

    /**
     * Retorna lista de Usuários dado determinado nome.
     * @param nome nome do(s) Usuário(s) a ser(em) buscado(s).
     * @return Character usuarioBd se um ou mais Usuários forem encontrados de acordo com o nome.
     *          Erro    se o nome não estiver cadastrado.
     */
    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
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

