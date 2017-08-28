package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Ingrediente;
import tcc.Services.IngredienteService;

@RequestMapping(value="/ingrediente")
@RestController
public class IngredienteController {

    @Autowired
    private IngredienteService ingredienteService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraIngrediente(@RequestBody Ingrediente ingrediente) {
        Ingrediente ingredienteResolvido = null;
        try {
            ingredienteResolvido = ingredienteService.verificarIngrediente(ingrediente);

        } catch (Exception ex) {
            return new ResponseEntity(new CustomError("Erro ao salvar Ingrediente"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Ingrediente>(ingredienteResolvido, HttpStatus.OK);
    }
}
