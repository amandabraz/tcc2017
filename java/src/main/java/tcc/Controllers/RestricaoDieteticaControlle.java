package tcc.Controllers;

//TODO: Colocar R no fim do nome

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

import java.util.List;

@RestController
public class RestricaoDieteticaControlle {

    @Autowired
    private RestricaoDieteticaDAO restricaoDieteticaDao;

    @RequestMapping(value="/restricaodietetica", method= RequestMethod.GET)
    public List<RestricaoDietetica> consultarRestricaoDietetica() {

        try {
            List<RestricaoDietetica> listaRestricoes = restricaoDieteticaDao.findAll();
             return listaRestricoes;

        } catch ( Exception e) {
            throw e;
        }


    }
}
