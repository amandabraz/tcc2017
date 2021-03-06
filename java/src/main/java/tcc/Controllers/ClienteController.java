package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Cliente;
import tcc.Models.Usuario;
import tcc.Services.ClienteService;
import tcc.Services.PedidoService;

import javax.transaction.Transactional;
import java.util.Objects;

@RestController
@RequestMapping(value="/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PedidoService pedidoService;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     */
    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = null;
        try {
            novoCliente = clienteService.salvaCliente(cliente);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar Cliente"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(novoCliente, HttpStatus.OK);
    }

    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscaClientePorUsuario(@PathVariable("id") Long usuarioId) {
        try {
            Usuario usuario = new Usuario(usuarioId);
            Cliente cliente = clienteService.buscaClientePorUsuario(usuario);
            return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao carregar dados do cliente"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{clienteId}", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscaCliente(@PathVariable("clienteId") Long clienteId) {
        try {
            Cliente cliente = clienteService.buscaCliente(clienteId);
            cliente.setQtdPedidos(pedidoService.buscaQtdPedidosPorCliente(clienteId));
            cliente.setQtdAvaliados(pedidoService.buscaQtdPedidosAvaliadosPorCliente(clienteId));
            return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao carregar dados do cliente"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity editaCliente(@RequestBody Cliente cliente) {
        try {
            Cliente clienteEditado = clienteService.editaCliente(cliente);
            if (Objects.isNull(clienteEditado)) {
                return new ResponseEntity<>(new CustomError("Erro ao salvar Cliente"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(clienteEditado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na edição do Usuário! Tente novamente");
        }
    }

    @RequestMapping(value = "{clienteId}/favoritos/{vendedorId}", method = RequestMethod.PUT)
    public ResponseEntity salvaVendedorFavorito(@PathVariable("clienteId") Long clienteId,
                                                @PathVariable("vendedorId") Long vendedorId) {
        try {
            Cliente cliente = clienteService.salvaVendedorFavorito(clienteId, vendedorId);
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar favorito"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "{clienteId}/favoritos/{vendedorId}", method = RequestMethod.DELETE)
    public ResponseEntity deletarVendedorFavorito(@PathVariable("clienteId") Long clienteId,
                                                @PathVariable("vendedorId") Long vendedorId) {
        try {
            Cliente cliente = clienteService.deletaVendedorFavorito(clienteId, vendedorId);
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao deletar favorito"), HttpStatus.NOT_FOUND);
        }
    }

 @RequestMapping(value="/{clienteId}/favoritos", method = RequestMethod.GET)
    public ResponseEntity buscaVendedoresFavoritos(@PathVariable("clienteId") Long clienteId) {
        try {
            Cliente cliente = clienteService.buscaCliente(clienteId);
            return new ResponseEntity<>(cliente.getVendedoresFavoritos(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao carregar vendedores favoritos do cliente"), HttpStatus.NOT_FOUND);
        }
    }
}






