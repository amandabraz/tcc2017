package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.DenunciaDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Denuncia;

/**
 * Created by amanda on 20/11/2017.
 */
@RestController
@RequestMapping(value="/denuncia")
public class DenunciaController {

    @Autowired
    private DenunciaDAO denunciaDAO;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity registraDenuncia(@RequestBody Denuncia denuncia) {
        try {
            return new ResponseEntity<>(denunciaDAO.save(denuncia), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar denuncia"), HttpStatus.BAD_REQUEST);
        }
    }
}
