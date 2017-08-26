package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.PagamentoDAO;
import tcc.Models.Pagamento;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoDAO pagamentoDAO;

    public Pagamento buscaMeioPagamento(Long id) {
        try {
            return pagamentoDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public Pagamento cadastraMeioPagamento(Pagamento pagamento) {
        try {
            if (pagamentoDAO.findByDescricao(pagamento.getDescricao()) != null) {
                return null;
            }
            return pagamentoDAO.save(pagamento);
        } catch (Exception e) {
            throw e;
        }
    }
}
