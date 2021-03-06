package tcc.Models;

import org.hibernate.annotations.BatchSize;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name= "TAG")
public class Tag implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_TAG")
    private Long id;

    @Column(name = "DESCRICAO", unique = true)
    private String descricao;

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

    public Tag() {
        this.id = id;
        this.descricao = descricao;
    }

    public Tag(Long id, String descricao, Set<Cliente> clientes) {
        this.id = id;
        this.descricao = descricao;
    }

    public Tag(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
