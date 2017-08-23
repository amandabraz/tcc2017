package tcc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import tcc.Models.Categoria;
import tcc.Models.Pagamento;
import tcc.Models.RestricaoDietetica;
import tcc.Services.CategoriaService;
import tcc.Services.PagamentoService;
import tcc.Services.RestricaoDieteticaService;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private PagamentoService pagamentoService;

    @Autowired
    private RestricaoDieteticaService restricaoDieteticaService;

    @Autowired
    private CategoriaService categoriaService;

    public void run(ApplicationArguments args) {

        // Para adicionar dado a tabela, só copiar uma linha e mudar o conteúdo
        
        pagamentoService.cadastraMeioPagamento(new Pagamento("Dinheiro"));
        pagamentoService.cadastraMeioPagamento(new Pagamento("Débito"));

        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Vegetariano"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Vegano"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Sem glúten"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Sem lactose"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Low carb"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Frugívora"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Paleolítica"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Mediterrânea"));
        restricaoDieteticaService.cadastraRestricaoDietetica(new RestricaoDietetica("Diet"));


        categoriaService.cadastraCategoria(new Categoria("Doce"));
        categoriaService.cadastraCategoria(new Categoria("Salgado"));
        categoriaService.cadastraCategoria(new Categoria("Bebida"));
    }
}
