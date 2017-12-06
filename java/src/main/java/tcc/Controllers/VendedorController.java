package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.VendedorDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Cliente;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;
import tcc.Services.ClienteService;
import tcc.Services.VendedorService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/vendedor")
public class VendedorController {

    @Autowired
    private VendedorDAO vendedorDAO;

    @Autowired
    private VendedorService vendedorService;

    @Autowired
    private ClienteService clienteService;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraVendedor(@RequestBody Vendedor vendedor) {
        Vendedor novoVendedor = null;
        try {
            novoVendedor = vendedorService.salvaVendedor(vendedor);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar Vendedor"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(novoVendedor, HttpStatus.OK);
    }

    /**
     * Busca Vendedor para exibir ao Cliente e busca se o vendedor está favoritado pelo cliente
     * @param vendedorId
     * @return
     */
    @RequestMapping(value = "/{vendedorId}/cliente/{clienteId}", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity procuraVendedorPorUsuario(@PathVariable("vendedorId") Long vendedorId,
                                                    @PathVariable("clienteId") Long clienteId) {
        try {
            Vendedor vendedor = vendedorService.buscaVendedor(vendedorId);
            Cliente cliente = clienteService.buscaCliente(clienteId);
            if (cliente.getVendedoresFavoritos().contains(vendedor)) {
                vendedor.setFavoritoDoCliente(true);
            } else  {
                vendedor.setFavoritoDoCliente(false);
            }
            return new ResponseEntity<Vendedor>(vendedor, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao carregar dados do vendedor"), HttpStatus.NOT_FOUND);
        }
    }
    

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity buscaVendedorPorFiltro(@RequestParam(value = "filtro") String filtro) {
        try {
            return new ResponseEntity<List<Vendedor>> (vendedorService.encontraVendedorPorFiltro(filtro), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao procurar Vendedor"), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity editaVendedor(@RequestBody Vendedor vendedor) {
        try {
            Vendedor vendedorEditado = vendedorService.editaVendedor(vendedor);
            if (Objects.isNull(vendedorEditado)) {
                return new ResponseEntity<>(new CustomError("Erro ao salvar Vendedor"), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(vendedorEditado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na edição do Usuário! Tente novamente");
        }
    }

    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity procuraVendedorPorUsuario(@PathVariable("id") Long usuarioId) {
        try {
            Usuario usuario = new Usuario(usuarioId);
            Vendedor vendedor = vendedorService.procuraVendedorPorUsuario(usuario);
            return new ResponseEntity<Vendedor>(vendedor, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao carregar dados do vendedor"), HttpStatus.NOT_FOUND);
        }
    }   
}
