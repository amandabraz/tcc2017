package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Localizacao;
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
            return ResponseEntity.ok("Localização salva com sucesso.");
        } catch(Exception e) {
            return ResponseEntity.unprocessableEntity().body("Erro ao salvar a requisição:\n\t"+e.getMessage());
        }
    }

}
