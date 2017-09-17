package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.LocalizacaoDAO;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Cliente;
import tcc.Models.Localizacao;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;
import tcc.Services.ClienteService;
import tcc.Services.UsuarioService;
import tcc.Services.VendedorService;
import tcc.Utils.UploadUtil;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping(value = "/usuario")
@RestController
public class UsuarioController {

    private char VENDEDOR = 'V';
    private char CLIENTE = 'C';

    @Autowired
    private LocalizacaoDAO localizacaoDAO;

    @Autowired
    private UsuarioDAO usuarioDao;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private VendedorService vendedorService;

    @Autowired
    private ClienteService clienteService;

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
            if (!StringUtils.isEmpty(usuario.getImagemPerfil())) {
                usuario.setImagemPerfil(UploadUtil.uploadFoto(usuario.getImagemPerfil()));
            }
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
     * Efetua login com email e senha
     * @param usuario
     * @return Character usuarioBd se o usuário for encontrado de acordo com o e-mail.
     *          Erro    se o email não estiver cadastrado.
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity efetuaLogin(@RequestBody Usuario usuario) {
        try {
            Usuario usuarioBd = usuarioDao.findUsuarioByEmailAndSenha(usuario.getEmail(), usuario.getSenha());
            if (usuarioBd != null) {
                //TODO: retornar ou outra opcao caso o usuario esteja DELETADO ou BLOQUEADO
                if (VENDEDOR == usuarioBd.getPerfil()) {
                    Vendedor vendedor = vendedorService.buscaVendedorPorUsuario(usuarioBd);
                    vendedor.setUsuario(usuarioBd);
                    return new ResponseEntity<Vendedor>(vendedor, HttpStatus.OK);
                } else if (CLIENTE == usuarioBd.getPerfil()) {
                    Cliente cliente = clienteService.buscaClientePorUsuario(usuarioBd);
                    cliente.setUsuario(usuarioBd);
                    return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
                }
                // Fallback somente: return Usuario
                return new ResponseEntity<Usuario>(usuarioBd, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Usuário não encontrado"), HttpStatus.FORBIDDEN);
            }
        } catch (NullPointerException | IndexOutOfBoundsException e) {
            return new ResponseEntity<>(new CustomError("Usuário não encontrado"), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao efetuar login"), HttpStatus.FORBIDDEN);
        }
    }

    /**
     * Retorna Usuário de acordo com o id dele.
     * @param id id do Usuário a ser buscado.
     * @return Character usuarioBd se o usuário for encontrado de acordo com o id.
     *          Erro    se o id não estiver cadastrado.
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
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

    /**
     * Atualiza localização de um Usuário.
     * @param novaLocalizacao localização a ser salva
     * @param idUsuario id do usuário a ter sua localização salva
     */
    @RequestMapping(value = "/{id}/localizacao/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity atualizaLocalizacao(@RequestBody Localizacao novaLocalizacao, @PathVariable("id") Long idUsuario){
        try{
            Usuario userToSetLocalization = usuarioDao.findUsuarioById(idUsuario);
            removeLocalizacaoAntiga(userToSetLocalization);
            novaLocalizacao.setUsuario(userToSetLocalization);
            novaLocalizacao.setHorario(new Date());
            localizacaoDAO.save(novaLocalizacao);
            return ResponseEntity.ok("Localização salva com sucesso.");
        }catch(Exception e){
            return ResponseEntity.unprocessableEntity().body("Erro ao salvar a requisição:\n\t"+e.getMessage());
        }
    }

    /**
     * Verifica se é necessário limpar as localizações de determinado usuário no banco antes de salvar alguma nova.
     * Isso é feito através da RN de que
     * @param userToSearch usuário a ser buscado na tabela de localização.
     */
    private void removeLocalizacaoAntiga(Usuario userToSearch){
        List<Localizacao> localizationsFromUser = localizacaoDAO.findByUsuario(userToSearch); //localizações do usuário

        Calendar cal = Calendar.getInstance(); //hoje
        cal.add(Calendar.MONTH, -1); //um mês atrás
        Date dateToSearch = cal.getTime(); //data de um mês atrás

        List<Localizacao> localizacoesAntigas =  localizationsFromUser.stream()
                  .filter(loc -> loc.getHorario().before(dateToSearch)) //filtro pra caso exista alguma localização anterior
                  .collect(Collectors.toList());
        if(!localizacoesAntigas.isEmpty()){
            localizacaoDAO.delete(localizacoesAntigas);
        }
    }
}