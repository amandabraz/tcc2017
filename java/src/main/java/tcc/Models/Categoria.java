package tcc.Models;

import javax.persistence.*;

/**
 * Created by larissa on 24/05/17.
 */

@Entity
@Table(
        name = "CATEGORIA"
)

public class Categoria {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    @Column(
            name = "ID_CATEGORIA"
    )
    private long id;

    @Column(
            name = "NOME",
            nullable = false,
            length = 100
    )
    private String nome;

    public Categoria() {
        super();
    }

    public Categoria(long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                '}';
    }
}
