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

    @Transactional
    public List<Produto> buscaProdutosPorVendedor(Long idVendedor) {
        try {
            return produtoDAO.findByDeletadoAndVendedorIdOrderByDataPreparacaoDesc(false, idVendedor);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Produto deletaProduto(Long idProduto) {
        try {
            Produto produtoADeletar = produtoDAO.findOne(idProduto);
            produtoADeletar.setDeletado(true);
            return produtoDAO.save(produtoADeletar);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Produto alteraQuantidadeProduto(Long idProduto, int novaQtd) {
        try {
            Produto produtoAAlterar = produtoDAO.findOne(idProduto);
            if (produtoAAlterar != null
                    && produtoAAlterar.getQuantidade() != novaQtd) {
                produtoAAlterar.setQuantidade(novaQtd);
            }
            return produtoDAO.save(produtoAAlterar);
        } catch (Exception e) {
            throw e;
        }
    }
}
