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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_PRODUTO")
    private long id;

    @Column(name = "NOME",
            nullable = false,
            length = 100)
    private String nome;

    @Column(name = "DATA_PREPARACAO",
            nullable = false)
    private Date dataPreparacao;

    @Column(name = "QUANTIDADE",
            nullable = false)
    private int quantidade;

    @Column(name = "PRECO",
            nullable = false)
    private float preco;

    @Column(name = "DELETADO",
            nullable = false)
    private boolean deletado;

    @OneToOne
    @JoinColumn(name = "FK_VENDEDOR", nullable = false)
    private Vendedor vendedor;

    public Produto() {
        this.id = id;
        this.nome = nome;
        this.dataPreparacao = dataPreparacao;
        this.quantidade = quantidade;
        this.preco = preco;
        this.deletado = deletado;
        this.vendedor = vendedor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Date getDataPreparacao() {
        return dataPreparacao;
    }

    public void setDataPreparacao(Date dataPreparacao) {
        this.dataPreparacao = dataPreparacao;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public boolean isDeletado() {
        return deletado;
    }

    public void setDeletado(boolean deletado) {
        this.deletado = deletado;
    }

    public Vendedor getVendedor() {
        return vendedor;
    }

    public void setVendedor(Vendedor vendedor) {
        this.vendedor = vendedor;
    }
}
