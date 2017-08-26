package tcc.Models;

import javax.persistence.*;

/**
 * Created by larissa on 24/05/17.
 */

@Entity
@Table(name = "CATEGORIA")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_CATEGORIA")
    private Long id;

    @Column(name = "DESCRICAO", unique = true)
    private String descricao;

    public Categoria() {
        super();
    }

    /**
     * Este construtor serve para classes que tem categoria como FK
     * @param id
     */
    public Categoria(Long id) {
        super();
        this.id = id;
    }

    public Categoria(long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Categoria(String descricao) {
        this.descricao = descricao;
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
        return "Categoria{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
