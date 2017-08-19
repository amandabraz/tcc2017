package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

/**
 * Created by amanda on 18/08/2017.
 */

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
}
