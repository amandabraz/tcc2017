package tcc.Models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by larissa on 18/05/17.
 */

@Entity
@Table(name = "PRODUTO")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_PRODUTO")
    private Long id;

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

    @ManyToMany(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
    @JoinTable(name="PRODUTO_RESTRICAO", joinColumns =
            {@JoinColumn(name="ID_PRODUTO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_RESTRICAO")})
    private List<RestricaoDietetica> restricoesDieteticas;

    @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
    @JoinTable(name="PRODUTO_TAG", joinColumns =
            {@JoinColumn(name="ID_PRODUTO", referencedColumnName = "ID_PRODUTO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_TAG", referencedColumnName = "ID_TAG")}
    )
    private Set<Tag> tags;

    @ManyToMany(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
    @JoinTable(name="PRODUTO_CATEGORIA", joinColumns =
            {@JoinColumn(name="ID_PRODUTO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_CATEGORIA")})
    private List<Categoria> categorias;

    public Produto() {
        this.id = id;
        this.nome = nome;
        this.dataPreparacao = dataPreparacao;
        this.quantidade = quantidade;
        this.preco = preco;
        this.deletado = deletado;
        this.vendedor = vendedor;
        this.restricoesDieteticas = restricoesDieteticas;
        this.tags = tags;
        this.categorias = categorias;
    }

    public Produto(String nome, Date dataPreparacao, int quantidade, float preco, boolean deletado, Vendedor vendedor, List<RestricaoDietetica> restricoesDieteticas, Set<Tag> tags, List<Categoria> categorias) {
        this.nome = nome;
        this.dataPreparacao = dataPreparacao;
        this.quantidade = quantidade;
        this.preco = preco;
        this.deletado = deletado;
        this.vendedor = vendedor;
        this.restricoesDieteticas = restricoesDieteticas;
        this.tags = tags;
        this.categorias = categorias;
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

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }

    public List<RestricaoDietetica> getRestricoesDieteticas() {
        return restricoesDieteticas;
    }

    public void setRestricoesDieteticas(List<RestricaoDietetica> restricoesDieteticas) {
        this.restricoesDieteticas = restricoesDieteticas;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", dataPreparacao=" + dataPreparacao +
                ", quantidade=" + quantidade +
                ", preco=" + preco +
                ", deletado=" + deletado +
                ", vendedor=" + vendedor +
                ", restricoesDieteticas=" + restricoesDieteticas +
                ", tags=" + tags +
                ", categorias=" + categorias +
                '}';
    }
}
