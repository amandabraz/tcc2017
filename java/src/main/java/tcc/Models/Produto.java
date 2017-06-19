package tcc.Models;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by larissa on 18/05/17.
 */

@Entity
@Table(
        name = "PRODUTO"
)
public class Produto {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    @Column(
            name = "ID_PRODUTO"
    )
    private long id;

    @Column(
            name = "NOME",
            nullable = false,
            length = 100
    )
    private String nome;

    @Column(
            name = "DATA_PREPARACAO",
            nullable = false
    )
    private Date dataPreparacao;

    @Column(
            name = "QUANTIDADE",
            nullable = false
    )
    private int quantidade;

    @Column(
            name = "PRECO",
            nullable = false
    )
    private float preco;

    @Column(
            name = "IND_DELETADO",
            nullable = false
    )
    private boolean deletado;
}
