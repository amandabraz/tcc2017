package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.UsuarioDAO;
import tcc.DAOs.VendedorDAO;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.Date;

/**
 * Created by amanda on 04/05/2017.
 */

@RestController
public class VendedorController {

    @Autowired
    private VendedorDAO vendedorDAO;
    @Autowired
    private UsuarioDAO usuarioDAO;


    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping("/vendedor")
    public String cadastraVendedor(@RequestParam(value="usarioId") Long usuarioId,
                                   @RequestParam(value="nomeFantasia") String nomeFantasia,
                                   @RequestParam(value="cpf") String cpf,
                                   @RequestParam(value=)) {
        // TODO: Mudar, não usar mais @RequestParam depois de confirmarmos que tudo está funcionando de acordo com o esperado.
        // Se não me engano, usaremos @PathVariable pra esconder as informações do usuário e não expor no url,
        // Usar PUT e não GET.
        Vendedor novoVendedor = null;
        try {
            Usuario usuario = usuarioDAO.findOne(usuarioId);
            novoVendedor = new Vendedor(usuario, nomeFantasia, cpf);

            novoVendedor = vendedorDAO.save(novoVendedor);
        } catch (Exception ex) {
            return "Error creating the user: " + ex.toString();
        }
        return "Vendedor criado com sucesso! (" + novoVendedor.toString() + ")";
    }
}
