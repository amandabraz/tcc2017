package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.CategoriaDAO;
import tcc.Models.Categoria;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaDAO categoriaDAO;

    public Categoria cadastraCategoria(Categoria categoria) {
        try {
            if (categoriaDAO.findByDescricao(categoria.getDescricao()) != null) {
                return null;
            }
            return categoriaDAO.save(categoria);
        } catch (Exception e) {
            throw e;
        }
    }
}
