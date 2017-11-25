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
import tcc.DAOs.LocalizacaoDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Localizacao;
import tcc.Models.Usuario;
import tcc.Services.LocalizacaoService;
import tcc.Services.UsuarioService;

import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping(value = "/localizacoes")
public class LocalizacaoController {

    @Autowired
    private LocalizacaoService localizacaoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private LocalizacaoDAO localizacaoDAO;

    /**
     * Atualiza localização de um Usuário.
     * @param novaLocalizacao localização a ser salva
     */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity atualizaLocalizacao(@RequestBody Localizacao novaLocalizacao){
        Localizacao localizacaoAtualizada = null;
        try {
            localizacaoService.removeLocalizacaoAntiga(novaLocalizacao.getUsuario());
            novaLocalizacao.setHorario(new Date());
            localizacaoAtualizada = localizacaoService.salvaNovaLocalizacao(novaLocalizacao);
            if (Objects.isNull(localizacaoAtualizada)) {
                return new ResponseEntity<>(new CustomError("Erro ao salvar localizacao"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(localizacaoAtualizada, HttpStatus.OK);
        } catch(Exception e) {
            return ResponseEntity.unprocessableEntity().body("Erro ao salvar a requisição:\n\t"+e.getMessage());
        }
    }



    /**
     * Retorna Localização dado id de um Usuário.
     * @param id id do Usuário a ser buscado.
     * @return Character    localizacaoFromBD se a Localização for encontrada de acordo com o id do usuário.
     *         Erro         se o id não estiver cadastrado.
     */
    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity buscaLocalizacaoDeUsuario(@PathVariable("id") Long id){
        Character type;
        try {
            Usuario userToSearch = usuarioService.buscaUsuario(id);
            Localizacao localizacaoFromBD = localizacaoDAO.findFirstByUsuarioOrderByHorarioDesc(userToSearch);
            return new ResponseEntity<>((localizacaoFromBD), HttpStatus.OK);
        } catch (NullPointerException | IndexOutOfBoundsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Localização não encontrada!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na busca de Localização! Tente novamente");
        }
    }
}
