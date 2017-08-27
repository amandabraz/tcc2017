package tcc.Models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Classe/Tabela que indica MEIOS DE PAGAMENTO que o vendedor aceita
 * Created by amanda on 10/05/2017.
 */
@Entity
@Table(name = "PAGAMENTO")
public class MeioPagamento implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_PAGAMENTO")
    private Long id;

    @Column(name = "DESCRICAO", unique = true)
    private String descricao;

    public MeioPagamento(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public MeioPagamento(String descricao) {
        this.descricao = descricao;
    }

    public MeioPagamento() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Pagamento{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
