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

@Service
public class VendedorService {

    @Autowired
    private VendedorDAO vendedorDAO;

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
}
