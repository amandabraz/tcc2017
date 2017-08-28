package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.MeioPagamentoDAO;
import tcc.Models.Pagamento;

import java.util.List;

/**
 * Created by amanda on 14/08/2017.
 */
@RestController
public class MeioPagamentoController {

    @Autowired
    private MeioPagamentoDAO meioPagamentoDAO;

    @RequestMapping(value="/meiopagamento", method = RequestMethod.GET)
    public List<Pagamento> consultarMeioPagamento() {

        try {
            List<Pagamento> listaPagamentos = meioPagamentoDAO.findAll();
            return listaPagamentos;

        } catch ( Exception e) {
            throw e;
        }
    }
}
