package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.MeioPagamentoDAO;
import tcc.Models.Pagamento;

import java.util.Date;

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
            // se pagamento já existe no banco, não cadastrar novamente
            if (meioPagamentoDAO.findByDescricao(pagamento.getDescricao()) != null) {
                return null;
            }
            // quando pagamento é novo, setar data atual
            pagamento.setRegDate(new Date());
            pagamento.setModDate(new Date());
            // pagamentos são salvos por admin (id 0)
            pagamento.setRegUser(0L);
            pagamento.setModUser(0L);
            return meioPagamentoDAO.save(pagamento);
        } catch (Exception e) {
            throw e;
        }
    }
}
