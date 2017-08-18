package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.ClienteDAO;
import tcc.Models.Cliente;

import javax.transaction.Transactional;

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
}
