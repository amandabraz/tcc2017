package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tcc.DAOs.VendedorDAO;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

@Service
public class VendedorService {

    @Autowired
    private VendedorDAO vendedorDAO;

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
}
