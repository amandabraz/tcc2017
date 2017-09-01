package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.CategoriaDAO;
import tcc.Models.Categoria;

import java.util.Date;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaDAO categoriaDAO;

    public Categoria cadastraCategoria(Categoria categoria) {
        try {
            // se categoria já existe no banco, não cadastrar novamente
            if (categoriaDAO.findByDescricao(categoria.getDescricao()) != null) {
                return null;
            }
            // quando registro é novo, setar data atual
            categoria.setRegDate(new Date());
            categoria.setModDate(new Date());
            // categorias são salvas por admin (id 0)
            categoria.setRegUser(0L);
            categoria.setModUser(0L);
            return categoriaDAO.save(categoria);
        } catch (Exception e) {
            throw e;
        }
    }
}
