package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Avaliacao;
import tcc.Services.AvaliacaoService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@RequestMapping(value="/avaliacao")
@RestController
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity enviaAvaliacao(@RequestBody Avaliacao avaliacao) {
        try {
            Avaliacao avaliacaoEnviada = avaliacaoService.enviaAvaliacao(avaliacao);
            avaliacaoService.recalculaNotaUsuario(avaliacao);
            if (Objects.nonNull(avaliacaoEnviada)) {
                return new ResponseEntity<>(avaliacaoEnviada, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Erro ao enviar a avaliação"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao enviar a avaliação"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/usuario/{receiver}", method = RequestMethod.GET)
    public ResponseEntity buscaAvaliacaoUusario(@PathVariable("receiver") Long receiver) {
        try {
              List<Avaliacao> avaliacoes = avaliacaoService.buscaAvaliacaoUsuario(receiver);
               if (avaliacoes.isEmpty()) {
                    return new ResponseEntity<>(new CustomError("Não há avaliações"), HttpStatus.NOT_FOUND);
                }
            return new ResponseEntity<List<Avaliacao>>(avaliacoes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar avaliações"), HttpStatus.BAD_REQUEST);
        }
    }

}
