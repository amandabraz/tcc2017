package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.VendedorDAO;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Service
public class VendedorService {

    @Autowired
    private VendedorDAO vendedorDAO;

    @Transactional
    public Vendedor salvaVendedor(Vendedor vendedor) {
        Vendedor vendedorResolvido;
        try {
            if (vendedor.getId() == null) {
                vendedor.setRegDate(new Date());
                vendedor.setRegUser(vendedor.getUsuario().getId());
            }
            vendedor.setModDate(new Date());
            vendedor.setModUser(vendedor.getUsuario().getId());
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
}
