package tcc.Models;

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
    private String meioPagamento;

    public Pagamento() {
        this.id = id;
        this.meioPagamento = meioPagamento;
    }

    public Pagamento(String meioPagamento) {
        this.meioPagamento = meioPagamento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeioPagamento() {
        return meioPagamento;
    }

    public void setMeioPagamento(String meioPagamento) {
        this.meioPagamento = meioPagamento;
    }

    @Override
    public String toString() {
        return "Pagamento{" +
                "id=" + id +
                ", meioPagamento='" + meioPagamento + '\'' +
                '}';
    }
}
