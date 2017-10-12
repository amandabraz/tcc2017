package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tcc.DAOs.ProdutoDAO;
import tcc.Models.Localizacao;
import tcc.Models.Produto;
import tcc.Utils.UploadUtil;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoDAO produtoDAO;

    @Autowired
    private LocalizacaoService localizacaoService;

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
    public List<Produto> encontraProduto(String filtro, double lat, double lng, double alt) {
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
            organizaPorDistancia(listaProdutosFiltrada, lat, lng, alt);

            return listaProdutosFiltrada;
        } catch (Exception e) {
            throw e;
        }
    }

    private void organizaPorDistancia(List<Produto> listaProdutosFiltrada, double latCliente, double lngCliente, double altCliente) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR_OF_DAY, -6);
        Date seisHorasAtras = calendar.getTime();

        List<Produto> listaProdutos = listaProdutosFiltrada;

        for (Produto produto : listaProdutos) {
            Localizacao localizacaoVendedor = localizacaoService.encontraLocalizacaoRecenteVendedor(produto.getVendedor());

            if (Objects.nonNull(localizacaoVendedor)) {
                double distancia = localizacaoService.calcularDistancia(latCliente, lngCliente, altCliente,
                        localizacaoVendedor.getLatitude(), localizacaoVendedor.getLongitude(), localizacaoVendedor.getAltitude());
                if (distancia < 10001) {
                    if (localizacaoVendedor.getHorario().after(seisHorasAtras)) {
                        produto.setDistancia(distancia);
                        continue;
                    } else {
                        // Setando um valor impossivel pra identificar que não há localizacao recente no banco
                        produto.setDistancia(-1);
                        continue;
                    }
                }
            }
            listaProdutosFiltrada.remove(produto);
        }
        Collections.sort(listaProdutosFiltrada);
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

    @Transactional
    public Produto buscaProduto(Long id) {
        try {
            return produtoDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }

    }

    public Produto editaProduto(Produto produto) throws IOException {
        try {
            Produto produtoEditado = null;
            if (Objects.isNull(buscaProduto(produto.getId()))) {
                return null;
            }

            produtoEditado = this.salvaProduto(produto);
            return produtoEditado;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<Produto> buscaProdutosPorPreferenciasCliente(Long clienteId) {
        try {
            return produtoDAO.findByPreferenciasCliente(clienteId);
        } catch (Exception e) {
            throw e;
        }
    }
}
