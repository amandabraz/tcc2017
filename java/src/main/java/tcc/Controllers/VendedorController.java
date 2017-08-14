package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcc.DAOs.PagamentoDAO;
import tcc.DAOs.UsuarioDAO;
import tcc.DAOs.VendedorDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Pagamento;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.Date;
import java.util.List;

/**
 * Created by amanda on 04/05/2017.
 */

@RestController
public class VendedorController {

    @Autowired
    private VendedorDAO vendedorDAO;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping(value = "/vendedor", method = RequestMethod.POST)
    public ResponseEntity cadastraVendedor(@RequestBody Vendedor vendedor) {
        Vendedor novoVendedor = null;
        try {
            novoVendedor = vendedorDAO.save(vendedor);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomError("Erro ao salvar Vendedor"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Vendedor>(novoVendedor, HttpStatus.OK);
    }
}
