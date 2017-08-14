package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.PagamentoDAO;
import tcc.Models.Pagamento;

import java.util.List;

/**
 * Created by amanda on 14/08/2017.
 */
@RestController
public class PagamentoController {

    @Autowired
    private PagamentoDAO pagamentoDAO;

    @RequestMapping(value="/pagamento", method = RequestMethod.GET)
    public List<Pagamento> buscaTodosMeiosPagamento() {
        List<Pagamento> meiosPagamento = pagamentoDAO.findAll();
        return meiosPagamento;
    }
}
