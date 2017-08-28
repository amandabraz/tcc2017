package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.VendedorDAO;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

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

}
