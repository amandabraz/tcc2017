package tcc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tcc.DAOs.PagamentoDAO;
import tcc.DAOs.UsuarioDAO;
import tcc.DAOs.VendedorDAO;
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
    @Autowired
    private UsuarioDAO usuarioDAO;
    @Autowired
    private PagamentoDAO pagamentoDAO;


    /**
     * Método que recebe info via REST para inserir um novo usuário no banco de dados
     * @param
     * @return
     */
    @RequestMapping("/vendedor")
    public String cadastraVendedor(@RequestParam(value="usuarioId") Long usuarioId,
                                   @RequestParam(value="nomeFantasia") String nomeFantasia,
                                   @RequestParam(value="cpf") String cpf) {
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

    //TODO: testar essa chamada, mas antes preencher a tabela pagamento com opçoes validas
    @RequestMapping("/pagamento")
    public String cadastraMeiosPagamento(@RequestParam(value="vendedorId") Long vendedorId,
                                         @RequestParam(value="meiosPagamento") List<String> meiosPagamento) {
        List<Pagamento> meiosAceitos = null;
        for (String meioPagamento : meiosPagamento) {
            Pagamento novoPagamento = pagamentoDAO.findByMeioPagamento(meioPagamento);
            meiosAceitos.add(novoPagamento);
        }
        Vendedor vendedor = vendedorDAO.findOne(vendedorId);
        vendedor.setPagamentosAceitos(meiosAceitos);

        vendedor = vendedorDAO.save(vendedor);

        return "Meio de pagamento para o vendedor " + vendedorId +
                "criado com sucesso! (" + vendedor.toString() + ")";
    }
}
