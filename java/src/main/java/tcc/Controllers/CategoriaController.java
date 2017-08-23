package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.CategoriaDAO;
import tcc.Models.Categoria;

import java.util.List;

@RequestMapping(value="/categoria")
@RestController
public class CategoriaController {

    @Autowired
    private CategoriaDAO categoriaDAO;

    @RequestMapping(method= RequestMethod.GET)
    public List<Categoria> consultarCategoria() {

        try {
            List<Categoria> listaCategorias = categoriaDAO.findAll();
            return listaCategorias;

        } catch ( Exception e) {
            throw e;
        }
    }
}
