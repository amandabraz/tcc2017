package tcc.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import tcc.DAOs.LocalizacaoDAO;
import tcc.DAOs.UsuarioDAO;
import tcc.Models.Localizacao;
import tcc.Models.Usuario;
import tcc.Services.LocalizacaoService;
import tcc.Services.UsuarioService;

import java.util.Date;

@RequestMapping(value = "/localizacoes")
public class LocalizacaoController {

    private UsuarioDAO usuarioDao;
    private LocalizacaoDAO localizacaoDAO;
    private LocalizacaoService localizacaoService;
    private UsuarioService usuarioService;

    /**
     * Atualiza localização de um Usuário.
     * @param novaLocalizacao localização a ser salva
     * @param idUsuario id do usuário a ter sua localização salva
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity atualizaLocalizacao(@RequestBody Localizacao novaLocalizacao, @PathVariable("id") Long idUsuario){
        try{
            Usuario userToSetLocalization = this.usuarioService.buscaUsuario(idUsuario);
            this.localizacaoService.removeLocalizacaoAntiga(userToSetLocalization);
            novaLocalizacao.setUsuario(userToSetLocalization);
            novaLocalizacao.setHorario(new Date());
            this.localizacaoService.salvaNovaLocalizacao(novaLocalizacao, userToSetLocalization);
            return ResponseEntity.ok("Localização salva com sucesso.");
        }catch(Exception e){
            return ResponseEntity.unprocessableEntity().body("Erro ao salvar a requisição:\n\t"+e.getMessage());
        }
    }

}
