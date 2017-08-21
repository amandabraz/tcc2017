package tcc.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name= "RESTRICAO_DIETETICA")
public class RestricaoDietetica implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_RESTRICAO")
    private Long id;

    @Column(name = "DESCRICAO", unique = true)
    private String descricao;

    public RestricaoDietetica(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public RestricaoDietetica(String descricao) {
        this.descricao = descricao;
    }

    public RestricaoDietetica() {
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
        return "RestricaoDietetica{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
