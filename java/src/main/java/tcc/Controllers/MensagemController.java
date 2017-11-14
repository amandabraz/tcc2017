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
import tcc.Models.Mensagem;
import tcc.Models.Pedido;
import tcc.Services.MensagemService;
import tcc.Services.PedidoService;

import javax.transaction.Transactional;
import java.util.Objects;
import java.util.Set;

/**
 * Created by amanda on 13/11/2017.
 */
@RequestMapping(value="/mensagem")
@RestController
public class MensagemController {

    @Autowired
    private MensagemService mensagemService;

    @Autowired
    private PedidoService pedidoService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity enviaMensagem(@RequestBody Mensagem mensagem) {
        try {
            Mensagem msgEnviada = mensagemService.enviaMsg(mensagem);
            if (Objects.nonNull(msgEnviada)) {
                return new ResponseEntity<>(msgEnviada, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Erro ao enviar a mensagem"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao enviar a mensagem"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/pedido/{pedidoId}", method = RequestMethod.GET)
    public ResponseEntity buscaMensagensPedido(@PathVariable("pedidoId") Long pedidoId) {
        try {
            Pedido pedido = pedidoService.buscaPedido(pedidoId);
            if (Objects.nonNull(pedido)) {
                Set<Mensagem> mensagens = mensagemService.buscaPorPedido(pedido);
                if (mensagens.isEmpty()) {
                    return new ResponseEntity<>(new CustomError("Não há mensagens"), HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<Set<Mensagem>>(mensagens, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Pedido não encontrado"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar mensagens"), HttpStatus.BAD_REQUEST);
        }
    }

}
