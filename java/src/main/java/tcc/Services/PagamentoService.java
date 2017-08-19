package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.PagamentoDAO;
import tcc.Models.Pagamento;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoDAO pagamentoDAO;

    public Pagamento cadastraMeioPagamento(Pagamento pagamento) {
        try {
            return pagamentoDAO.save(pagamento);
        } catch (Exception e) {
            throw e;
        }
    }
}
