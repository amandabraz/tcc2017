package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.AvaliacaoDAO;
import tcc.Models.Avaliacao;
import tcc.Models.Pedido;
import tcc.Models.Produto;
import tcc.Models.Usuario;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoDAO avaliacaoDAO;

    @Autowired
    private UsuarioService usuarioService;

    public Avaliacao enviaAvaliacao(Avaliacao avaliacao) {
        try {
            return avaliacaoDAO.save(avaliacao);
        } catch(Exception e) {
            throw e;
        }
    }

    public List<Avaliacao> buscaAvaliacaoUsuario(Long idReceiver) {
        try {
            return avaliacaoDAO.findByReceiverOrderByDataAvaliacaoAsc(idReceiver);
        } catch(Exception e) {
            throw e;
        }
    }

    @Transactional
        public int recalculaNotaUsuario(Avaliacao avaliacao) throws IOException {
        try {
                Usuario usuario = usuarioService.buscaUsuario(avaliacao.getReceiver());
                long somaNotas = avaliacaoDAO.selectSomaNotasPorUsuario(avaliacao.getReceiver());
                long countNotas = avaliacaoDAO.countNotasPorUsuario(avaliacao.getReceiver());

            Integer novaNota = Math.round(somaNotas / countNotas);
            usuario.setNota(novaNota);
            usuarioService.editaUsuario(usuario);

            return novaNota;
        } catch (Exception e) {
            throw e;
        }
    }
}
