package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

import java.util.Date;

@Service
public class RestricaoDieteticaService {

    @Autowired
    private RestricaoDieteticaDAO restricaoDieteticaDAO;

    public RestricaoDietetica buscaRestricaoDietetica(Long id) {
        try {
            return restricaoDieteticaDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public RestricaoDietetica cadastraRestricaoDietetica(RestricaoDietetica restricaoDietetica) {
        try {
            // se restricao já existe no banco, não cadastrar novamente
            if (restricaoDieteticaDAO.findByDescricao(restricaoDietetica.getDescricao()) != null) {
                return null;
            }
            // quando pagamento é novo, setar data atual
            restricaoDietetica.setRegDate(new Date());
            restricaoDietetica.setModDate(new Date());
            // pagamentos são salvos por admin (id 0)
            restricaoDietetica.setRegUser(0L);
            restricaoDietetica.setModUser(0L);
            return restricaoDieteticaDAO.save(restricaoDietetica);
        } catch (Exception e) {
            throw e;
        }
    }
}
