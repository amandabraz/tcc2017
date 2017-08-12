package tcc.Controllers;

//TODO: Colocar R no fim do nome

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.RestricaoDieteticaDAO;
import tcc.Models.RestricaoDietetica;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RestricaoDieteticaControlle {

    @Autowired
    private RestricaoDieteticaDAO restricaoDieteticaDao;

    @RequestMapping(value="/restricaodietetica", method= RequestMethod.GET)
    public @ResponseBody List<RestricaoDietetica> consultarRestricaoDietetica() throws JSONException {

        try {
            List<RestricaoDietetica> listaRestricoes = restricaoDieteticaDao.findAll();

            /*List<JSONObject> entities = new ArrayList<JSONObject>();

            for (RestricaoDietetica n : listaRestricoes) {
                System.out.println(n.toString());
                JSONObject restricaoDietetica = new JSONObject();
                restricaoDietetica.put("id", n.getId());
                restricaoDietetica.put("descricao", n.getDescricao());
                entities.add(restricaoDietetica);
            }
            return new ResponseEntity<Object>(entities, HttpStatus.OK); */
             return listaRestricoes;


        } catch ( Exception e) {
            throw e;
        }


    }
}
