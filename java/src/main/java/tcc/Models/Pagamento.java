package tcc.Models;

import tcc.Enums.MeioPagamento;

import javax.persistence.*;

/**
 * Classe/Tabela que indica MEIOS DE PAGAMENTO que o vendedor aceita
 * Created by amanda on 10/05/2017.
 */
@Entity
@Table(name = "PAGAMENTO")
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_PAGAMENTO")
    private Long id;

    @Column(name = "MEIO_PAGAMENTO")
    @Enumerated(EnumType.STRING)
    private MeioPagamento meioPagamento;

    public Pagamento(Long id) {
        super();
        this.id = id;
    }

    public Pagamento(MeioPagamento meioPagamento) {
        this.meioPagamento = meioPagamento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MeioPagamento getMeioPagamento() {
        return meioPagamento;
    }

    public void setMeioPagamento(MeioPagamento meioPagamento) {
        this.meioPagamento = meioPagamento;
    }
}
