package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

import java.util.List;

public class RestricaoDieteticaController {

    @Autowired
    private RestricaoDieteticaDAO restricaoDieteticaDAO;

    @RequestMapping(value="/restricaodietetica", method= RequestMethod.GET)
    public List<RestricaoDietetica> consultarRestricaoDietetica() {

        try {
            List<RestricaoDietetica> listaRestricoes = restricaoDieteticaDAO.findAll();
            return listaRestricoes;

        } catch ( Exception e) {
            throw e;
        }

    }
}
