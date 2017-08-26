package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

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
            if (restricaoDieteticaDAO.findByDescricao(restricaoDietetica.getDescricao()) != null) {
                return null;
            }
            return restricaoDieteticaDAO.save(restricaoDietetica);
        } catch (Exception e) {
            throw e;
        }
    }
}
