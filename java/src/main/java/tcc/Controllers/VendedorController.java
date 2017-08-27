package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.VendedorDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

@RequestMapping(value = "/vendedor")
@RestController
public class VendedorController {

    @Autowired
    private VendedorDAO vendedorDAO;

    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity cadastraVendedor(@RequestBody Vendedor vendedor) {
        Vendedor novoVendedor = null;
        try {
            novoVendedor = vendedorDAO.save(vendedor);
        } catch (Exception ex) {
            System.out.println(ex.fillInStackTrace());
            return new ResponseEntity<>(new CustomError("Erro ao salvar Vendedor"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Vendedor>(novoVendedor, HttpStatus.OK);
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
