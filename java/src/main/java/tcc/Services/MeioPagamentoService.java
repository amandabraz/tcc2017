package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.MeioPagamentoDAO;
import tcc.Models.Pagamento;

@Service
public class MeioPagamentoService {

    @Autowired
    private MeioPagamentoDAO meioPagamentoDAO;

    public Pagamento procuraMeioPagamento(Long id) {
        try {
            return meioPagamentoDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public Pagamento cadastraMeioPagamento(Pagamento pagamento) {
        try {
            if (meioPagamentoDAO.findByDescricao(pagamento.getDescricao()) != null) {
                return null;
            }
            return meioPagamentoDAO.save(pagamento);
        } catch (Exception e) {
            throw e;
        }
    }
}
