package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.IngredienteDAO;

/**
 * Created by larissa on 24/05/17.
 */

@RestController
public class IngredienteController {

    @Autowired
    private IngredienteDAO IngredienteDao;
}
