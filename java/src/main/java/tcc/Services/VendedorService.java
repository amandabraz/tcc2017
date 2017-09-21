package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.VendedorDAO;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Service
public class VendedorService {

    @Autowired
    private VendedorDAO vendedorDAO;

    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public Vendedor salvaVendedor(Vendedor vendedor) {
        Vendedor vendedorResolvido;
        try {
            vendedorResolvido = vendedorDAO.save(vendedor);
        } catch (Exception e) {
            throw e;
        }
        return vendedorResolvido;
    }

    public Vendedor buscaVendedor(Long id) {
        try {
            return vendedorDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public Vendedor buscaVendedorPorUsuario(Usuario usuario) {
        try {
            return vendedorDAO.findByUsuario(usuario);
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public List<Vendedor> encontraVendedorPorFiltro(String filtro) {
        try {
            List<Vendedor> listaVendedores = new ArrayList<>();
            listaVendedores.addAll(vendedorDAO.findByNomeFantasiaIgnoreCaseContaining(filtro));
            listaVendedores.addAll(vendedorDAO.findByUsuarioNomeIgnoreCaseContaining(filtro));

            // remove itens duplicados
            List<Vendedor> listaVendedoresFiltrada = new ArrayList<Vendedor>(new HashSet<Vendedor>(listaVendedores));

            return listaVendedoresFiltrada;
        } catch (Exception e) {
            throw e;
        }
    }

    public Vendedor procuraVendedorPorUsuario(Usuario usuario) {
        try {
            return vendedorDAO.findByUsuario(usuario);
        } catch (Exception e) {
            throw e;
        }
    }

    public Vendedor editaVendedor(Vendedor vendedor) {
        try {
            Vendedor vendedorEditado = null;
            if (Objects.isNull(buscaVendedor(vendedor.getId()))) {
                return null;
            }
            Usuario usuarioEditado = usuarioService.editaUsuario(vendedor.getUsuario());
            if (Objects.isNull(usuarioEditado)) {
                return null;
            }
            vendedor.setUsuario(usuarioEditado);
            vendedorEditado = this.salvaVendedor(vendedor);
            return vendedorEditado;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
