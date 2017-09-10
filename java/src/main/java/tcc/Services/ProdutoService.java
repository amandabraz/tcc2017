package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tcc.DAOs.ProdutoDAO;
import tcc.Models.Produto;
import tcc.Utils.UploadUtil;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoDAO produtoDAO;

    @Transactional
    public Produto salvaProduto(Produto produto) throws IOException {
        try {
            if (!StringUtils.isEmpty(produto.getImagemPrincipal())) {
                produto.setImagemPrincipal(UploadUtil.uploadFoto(produto.getImagemPrincipal()));
            }
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
    public Produto deletaProduto(Long idVendedor, Long idProduto) throws IOException {
        try {
            Produto produtoADeletar = produtoDAO.findOne(idProduto);
            if (idVendedor == produtoADeletar.getVendedor().getId()) {
                produtoADeletar.setDeletado(true);
            }
            return this.salvaProduto(produtoADeletar);
        } catch (IOException e) {
            throw e;
        }
    }

    @Transactional
    public Produto alteraQuantidadeProduto(Long idVendedor, Long idProduto, int novaQtd) throws IOException {
        try {
            Produto produtoAAlterar = produtoDAO.findOne(idProduto);
            if (produtoAAlterar != null
                    && idVendedor == produtoAAlterar.getVendedor().getId()
                    && produtoAAlterar.getQuantidade() != novaQtd) {
                produtoAAlterar.setQuantidade(novaQtd);
            }
            return this.salvaProduto(produtoAAlterar);
        } catch (IOException e) {
            throw e;
        }
    }
}
