package tcc.Models;

import org.hibernate.annotations.BatchSize;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

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

    @ManyToMany(mappedBy = "tags")
    private Set<Cliente> clientes;

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
        this.clientes = clientes;
    }

    public Tag(Long id, String descricao, Set<Cliente> clientes) {
        this.id = id;
        this.descricao = descricao;
        this.clientes = clientes;
    }

    public Tag(String descricao) {
        this.descricao = descricao;
    }

    public Set<Cliente> getClientes() {
        return clientes;
    }

    public void setClientes(Set<Cliente> clientes) {
        this.clientes = clientes;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                ", clientes=" + clientes +
                '}';
    }
}
