package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tcc.DAOs.ClienteDAO;
import tcc.Models.Cliente;
import tcc.Models.Usuario;

/**
 * Created by amanda on 17/08/2017.
 */
@Service
public class ClienteService {

    @Autowired
    private ClienteDAO clienteDAO;

    @Transactional
    public Cliente salvaCliente(Cliente cliente) {
        Cliente clienteResolvido;
        try {
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
}
