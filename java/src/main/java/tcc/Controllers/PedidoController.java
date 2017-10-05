package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.PedidoDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Pedido;
import tcc.Services.PedidoService;

import javax.transaction.Transactional;
import java.util.Objects;

@RequestMapping(value = "/pedido")
@RestController
public class PedidoController {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Autowired
    private PedidoService pedidoService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity registraPedido(@RequestBody Pedido pedido) {
        try {
            Pedido novoPedido = pedidoService.salvaPedido(pedido);
            if (Objects.nonNull(novoPedido)) {
                return new ResponseEntity<>(novoPedido, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Erro ao registrar o pedido"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao registrar o pedido"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/{idPedido}", method = RequestMethod.GET)
    public ResponseEntity encontraPedido(@PathVariable("idPedido") Long idPedido) {
        try {
            Pedido pedidoEncontrado = pedidoService.buscaPedido(idPedido);
            return new ResponseEntity<Pedido>(pedidoEncontrado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar o pedido"), HttpStatus.BAD_REQUEST);
        }
    }
}