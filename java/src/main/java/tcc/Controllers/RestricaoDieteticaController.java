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

    @RequestMapping(value="/dieta", method = RequestMethod.GET)
    public List<RestricaoDietetica> buscaTodasDietas() {
        List<RestricaoDietetica> dietas = restricaoDieteticaDAO.findAll();
        return dietas;
    }
}
