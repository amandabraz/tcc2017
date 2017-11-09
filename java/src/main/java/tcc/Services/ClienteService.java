package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tcc.DAOs.ClienteDAO;
import tcc.Models.Cliente;
import tcc.Models.Tag;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class ClienteService {

    @Autowired
    private ClienteDAO clienteDAO;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TagService tagService;

    @Autowired
    private VendedorService vendedorService;

    @Transactional
    public Cliente salvaCliente(Cliente cliente) {
        Cliente clienteResolvido;
        try {
            salvaTags(cliente);
            clienteResolvido = clienteDAO.save(cliente);
        } catch (Exception e) {
            throw e;
        }
        return clienteResolvido;
    }

    public Cliente buscaCliente(Long id) {
        try {
            return clienteDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }

    public Cliente buscaClientePorUsuario(Usuario usuario) {
        try {
           return clienteDAO.findByUsuario(usuario);
        } catch (Exception e) {
            throw e;
        }
    }

    public Cliente editaCliente(Cliente cliente) {
        try {
            Cliente clienteEditado = null;
            if (Objects.isNull(buscaCliente(cliente.getId()))) {
                return null;
            }
            Usuario usuarioEditado = usuarioService.editaUsuario(cliente.getUsuario());
            if (Objects.isNull(usuarioEditado)) {
                return null;
            }
            cliente.setUsuario(usuarioEditado);
            clienteEditado = this.salvaCliente(cliente);
            return clienteEditado;
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean editaTagsDoCliente(Cliente cliente) {
        try {
            return false;
        } catch (Exception e) {
            throw e;
        }
    }

    public void salvaTags(Cliente cliente) {
        Set<Tag> tagsSalvas = new HashSet<>();
        Tag tagSalva;
        for (Tag tagProposta : cliente.getTags()) {
            tagSalva = tagService.verificarTag(tagProposta);
            if (tagSalva != null) {
                tagsSalvas.add(tagSalva);
            }
        }
        if (!tagsSalvas.isEmpty()) {
            cliente.setTags(tagsSalvas);
        }
    }

    public Cliente salvaVendedorFavorito(Long clienteId, Long vendedorId) {
        try {
            Cliente cliente = this.buscaCliente(clienteId);
            Set<Vendedor> vendedoresFavoritos = cliente.getVendedoresFavoritos();
            vendedoresFavoritos.add(vendedorService.buscaVendedor(vendedorId));
            cliente.setVendedoresFavoritos(vendedoresFavoritos);
            return this.salvaCliente(cliente);
        } catch (Exception e) {
            throw e;
        }
    }

    public Cliente deletaVendedorFavorito(Long clienteId, Long vendedorId) {
        try {
            Cliente cliente = this.buscaCliente(clienteId);
            Set<Vendedor> vendedoresFavoritos = cliente.getVendedoresFavoritos();
            vendedoresFavoritos.remove(vendedorService.buscaVendedor(vendedorId));
            cliente.setVendedoresFavoritos(vendedoresFavoritos);
            return this.salvaCliente(cliente);
        } catch (Exception e) {
            throw e;
        }
    }
}
