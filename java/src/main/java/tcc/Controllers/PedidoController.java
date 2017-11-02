package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.CustomQueryHelpers.QuantidadePedidos;
import tcc.DAOs.PedidoDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Pedido;
import tcc.CustomQueryHelpers.QuantidadeVendidaCliente;
import tcc.Services.PedidoService;

import javax.transaction.Transactional;
import java.util.List;
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
            Pedido novoPedido = pedidoService.geraPedido(pedido);
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

    @Transactional
    @RequestMapping(value = "/vendedor/{vendedorId}", method = RequestMethod.GET)
    public ResponseEntity buscaPedidosVendedor(@PathVariable("vendedorId") Long vendedorId) {
        try {
            List<Pedido> pedidos = pedidoService.buscaPedidosVendedor(vendedorId);
            return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar pedidos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/cliente/{clienteId}", method = RequestMethod.GET)
    public ResponseEntity buscaPedidosCliente(@PathVariable("clienteId") Long clienteId) {
        try {
            List<Pedido> pedidos = pedidoService.buscaPedidosCliente(clienteId);
            return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar pedidos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/vendedor/{vendedorId}/status/{status}", method = RequestMethod.GET)
    public ResponseEntity buscaPedidosPorStatusVendedor(@PathVariable("status") String status,
                                                        @PathVariable("vendedorId") Long vendedorId) {
        try {
            List<Pedido> pedidos = pedidoService.buscaPedidosPorStatusVendedor(status, vendedorId);
            return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar pedidos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/cliente/{clienteId}/status/{status}", method = RequestMethod.GET)
    public ResponseEntity buscaPedidosPorStatusCliente(@PathVariable("status") String status,
                                                        @PathVariable("clienteId") Long clienteId) {
        try {
            List<Pedido> pedidos = pedidoService.buscaPedidosPorStatusCliente(status, clienteId);
            return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar pedidos"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "/{idPedido}/status/{status}", method = RequestMethod.PUT)
    public ResponseEntity alteraStatus(@PathVariable("idPedido") Long idPedido,
                                       @PathVariable("status") String status) {
        try {
            Pedido pedidoAtualizado = pedidoService.alterarStatus(idPedido,status);
            return new ResponseEntity<Pedido>(pedidoAtualizado, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao alterar status do pedido"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "{status}/vendedor/{vendedorId}", method = RequestMethod.GET)
    public ResponseEntity buscaPedidoVendedor(@PathVariable("status") String status,
                                              @PathVariable("vendedorId") Long vendedorId) {
        try {
            Pedido pedido = pedidoService.buscaPedidoVendedor(status, vendedorId);
            if(Objects.nonNull(pedido)) {
                return new ResponseEntity <Pedido>(pedido, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomError("Não existem pedidos solicitados"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar pedido"), HttpStatus.BAD_REQUEST);
        }
    }


    @Transactional
    @RequestMapping(value = "quantidade/vendedor/{vendedorId}", method = RequestMethod.GET)
    public ResponseEntity quantidadeVendidaProduto(@PathVariable("vendedorId") Long vendedorId) {
        try {
            List<QuantidadePedidos> pedidos = pedidoService.quantidadeVendidaProduto(vendedorId);
            if (CollectionUtils.isEmpty(pedidos)) {
                return new ResponseEntity<>(new CustomError("Erro ao buscar quantidades vendidas"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity <List<QuantidadePedidos>>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar quantidades vendidas"), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "valorTotal/vendedor/{vendedorId}", method = RequestMethod.GET)
    public ResponseEntity quantidadeVendidaProduto(
            @PathVariable("vendedorId") Long vendedorId,
            @RequestParam(required = true, name="lastDays") Integer diasParaBusca,
            @RequestParam(required = true, name="maxCount") Integer quantidadeMaxProdutos) {
        try {
            List<Object> valorTotalVendaNomeProduto = pedidoService.buscaValorTotalVendaPorProduto(vendedorId, diasParaBusca, quantidadeMaxProdutos);
            return new ResponseEntity<>(valorTotalVendaNomeProduto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar valor total de vendas\n" + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "{pedidoId}/produto/avaliacao/{nota}", method = RequestMethod.PUT)
    public ResponseEntity avaliaProduto(@PathVariable("pedidoId") Long pedidoId,
                                        @PathVariable("nota") Integer nota) {
        try {
            Pedido pedido = pedidoService.buscaPedido(pedidoId);
            pedido.setNota(nota);
            pedidoService.salvarPedido(pedido);
            pedidoService.recalculaScoreProduto(pedido);
            return new ResponseEntity(pedido, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar avaliação"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @RequestMapping(value = "qtd/ncliente/vendedor/{vendedorId}/{filtroMensal}", method = RequestMethod.GET)
    public ResponseEntity qtdVendidaCliente(@PathVariable("vendedorId") Long vendedorId,
                                            @PathVariable("filtroMensal") Boolean filtroMensal) {
        try {
            QuantidadeVendidaCliente pedidos = pedidoService.qtdVendidaCliente(vendedorId, filtroMensal);
            return new ResponseEntity <QuantidadeVendidaCliente>(pedidos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao buscar quantidades vendidas"), HttpStatus.BAD_REQUEST);
        }
    }

}
