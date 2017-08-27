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
            Ingrediente ingredienteEncontrada = ingredienteDAO.findByItem(ingrediente.getItem());
            if (ingredienteEncontrada != null) return ingredienteEncontrada;
            return cadastraIngrediente(ingrediente);
        } catch(Exception e) {
            throw e;
        }
    }

    @Transactional
    public Ingrediente cadastraIngrediente(Ingrediente ingrediente) {
        Ingrediente ingredienteCadastrada;
        try {
            ingredienteCadastrada = ingredienteDAO.save(ingrediente);
        } catch (Exception e) {
            throw e;
        }
        return ingredienteCadastrada;
    }
}
