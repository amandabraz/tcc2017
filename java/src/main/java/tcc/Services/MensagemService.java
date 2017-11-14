package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.MensagemDAO;
import tcc.Models.Mensagem;
import tcc.Models.Pedido;

import java.util.Set;

/**
 * Created by amanda on 13/11/2017.
 */
@Service
public class MensagemService {

    @Autowired
    private MensagemDAO mensagemDAO;

    public Mensagem enviaMsg(Mensagem mensagem) {
        try {
            return mensagemDAO.save(mensagem);
        } catch(Exception e) {
            throw e;
        }
    }

    public Set<Mensagem> buscaPorPedido(Pedido pedido) {
        try {
            return mensagemDAO.findByPedidoOrderByDataMsgAsc(pedido);
        } catch(Exception e) {
            throw e;
        }
    }
}
