package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.MeioPagamentoDAO;
import tcc.Models.MeioPagamento;

@Service
public class MeioPagamentoService {

    @Autowired
    private MeioPagamentoDAO meioPagamentoDAO;

    public MeioPagamento procuraMeioPagamento(Long id) {
        try {
            return meioPagamentoDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public MeioPagamento cadastraMeioPagamento(MeioPagamento meioPagamento) {
        try {
            if (meioPagamentoDAO.findByDescricao(meioPagamento.getDescricao()) != null) {
                return null;
            }
            return meioPagamentoDAO.save(meioPagamento);
        } catch (Exception e) {
            throw e;
        }
    }
}
