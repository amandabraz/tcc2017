package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.ProdutoDAO;
import tcc.Models.Produto;

import javax.transaction.Transactional;

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
}
