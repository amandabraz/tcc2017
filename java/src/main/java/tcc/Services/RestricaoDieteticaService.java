package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

@Service
public class RestricaoDieteticaService {

    @Autowired
    private RestricaoDieteticaDAO restricaoDieteticaDAO;

    public RestricaoDietetica cadastraRestricaoDietetica(RestricaoDietetica restricaoDietetica) {
        try {
            return restricaoDieteticaDAO.save(restricaoDietetica);

        } catch (Exception e) {
            throw e;
        }
    }
}