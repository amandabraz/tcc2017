package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.ProdutoDAO;
import tcc.Models.Produto;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoDAO produtoDAO;

    @Transactional
    public Produto salvaProduto(Produto produto) {
        try {
            return produtoDAO.save(produto);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<Produto> encontraProduto(String filtro) {
        try {
            List<Produto> listaProdutos = new ArrayList<>();
            listaProdutos.addAll(produtoDAO.findByDeletadoAndNomeIgnoreCaseContaining(false, filtro));
            listaProdutos.addAll(produtoDAO.findByDeletadoAndTagsDescricaoIgnoreCaseContaining(false, filtro));
            listaProdutos.addAll(produtoDAO.findByDeletadoAndIngredientesItemIgnoreCaseContaining(false, filtro));
            listaProdutos.addAll(produtoDAO.findByDeletadoAndRestricoesDieteticasDescricaoIgnoreCaseContaining(false, filtro));
            listaProdutos.addAll(produtoDAO.findByDeletadoAndCategoriaDescricaoIgnoreCaseContaining(false, filtro));
            listaProdutos.addAll(produtoDAO.findByDeletadoAndVendedorNomeFantasiaIgnoreCaseContaining(false, filtro));

            // remove resultados duplicados
            List<Produto> listaProdutosFiltrada = new ArrayList<Produto>(new HashSet<Produto>(listaProdutos));

            return listaProdutosFiltrada;
        } catch (Exception e) {
            throw e;
        }
    }
}
