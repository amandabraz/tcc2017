package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.IngredienteDAO;
import tcc.Models.Ingrediente;

import javax.transaction.Transactional;

@Service
public class IngredienteService {

    @Autowired
    private IngredienteDAO ingredienteDAO;

    public Ingrediente verificarIngrediente(Ingrediente ingrediente) {
        try {
            Ingrediente ingredienteEncontrado = ingredienteDAO.findByItem(ingrediente.getItem());
            if (ingredienteEncontrado != null) return ingredienteEncontrado;
            return cadastraIngrediente(ingrediente);
        } catch(Exception e) {
            throw e;
        }
    }

    @Transactional
    public Ingrediente cadastraIngrediente(Ingrediente ingrediente) {
        Ingrediente ingredienteCadastrado;
        try {
            ingredienteCadastrado = ingredienteDAO.save(ingrediente);
        } catch (Exception e) {
            throw e;
        }
        return ingredienteCadastrado;
    }
}
