package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.AvaliacaoDAO;
import tcc.Models.Avaliacao;
import tcc.Models.Pedido;
import tcc.Models.Produto;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    AvaliacaoDAO avaliacaoDAO;

    @Autowired
    ProdutoService produtoService;

    @Transactional
    public Avaliacao salvaAvaliacao(Avaliacao avaliacao) {
        try {
            return avaliacaoDAO.save(avaliacao);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Avaliacao buscaAvaliacaoPedido(Pedido pedido) {
        try {
          return avaliacaoDAO.findByPedido(pedido);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public int recalculaScoreProduto(Avaliacao novaAvaliacao) throws IOException {
        try {
            Produto produto = produtoService.buscaProduto(novaAvaliacao.getProduto().getId());
            this.salvaAvaliacao(novaAvaliacao);

            List<Avaliacao> avaliacaoList = avaliacaoDAO.findByProduto(produto);
            float somaNotas = 0;
            for (Avaliacao avaliacao : avaliacaoList) {
                somaNotas += avaliacao.getNota();
            }

            int novoScore = Math.round(somaNotas / avaliacaoList.size());
            // edita e salva Produto
            produto.setScore(novoScore);
            produtoService.editaProduto(produto);

            // retorna score atualizado pra tela de Pedidos
            return novoScore;

        } catch (Exception e) {
            throw e;
        }
    }
}
