package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.IngredienteDAO;
import tcc.Models.Ingrediente;

import javax.transaction.Transactional;
import java.util.Date;

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
            ingrediente.setRegDate(new Date());
            ingrediente.setModDate(new Date());
            //TODO: definir de onde virá o user pro reg_user e mod_user... deveria ser o id do user vendedor mas fica ruim passar pra cá esse valor
            ingredienteCadastrado = ingredienteDAO.save(ingrediente);
        } catch (Exception e) {
            throw e;
        }
        return ingredienteCadastrado;
    }
}
