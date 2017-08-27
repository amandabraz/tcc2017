package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.VendedorDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;
import tcc.Services.VendedorService;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Set;

/**
 * Created by amanda on 04/05/2017.
 */

@RestController
@RequestMapping(value = "/vendedor")
public class VendedorController {

    @Autowired
    private VendedorService vendedorService;

    @Autowired
    private VendedorDAO vendedorDAO;

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
        return new ResponseEntity<>(novoVendedor.getId(), HttpStatus.OK);
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

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity buscaVendedorPorUsuario(@RequestParam(value = "usuarioId") Long usuarioId) {
        try {
            Usuario usuario = new Usuario(usuarioId);
            return new ResponseEntity<Vendedor> (vendedorDAO.findByUsuario(usuario), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomError("Erro ao procurar Vendedor"), HttpStatus.BAD_REQUEST);
        }
    }
}
