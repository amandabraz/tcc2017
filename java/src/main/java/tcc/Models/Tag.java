package tcc.Models;

import org.hibernate.annotations.BatchSize;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@BatchSize(size = 50)
@Table(name= "TAG")
public class Tag {

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

    public Tag(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Tag(String descricao) {
        this.descricao = descricao;
    }
}
