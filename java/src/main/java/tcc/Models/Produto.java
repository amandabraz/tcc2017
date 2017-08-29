package tcc.Models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "PRODUTO")
public class Produto implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_PRODUTO")
    private Long id;

    @Column(name = "NOME",
            nullable = false,
            length = 100)
    private String nome;

    @Temporal(TemporalType.TIMESTAMP)
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
    private boolean deletado = false;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_VENDEDOR", nullable = false)
    private Vendedor vendedor;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="PRODUTO_RESTRICAO", joinColumns =
            {@JoinColumn(name="ID_PRODUTO", referencedColumnName = "ID_PRODUTO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_RESTRICAO", referencedColumnName = "ID_RESTRICAO")})
    private Set<RestricaoDietetica> restricoesDieteticas;

    @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
    @JoinTable(name="PRODUTO_INGREDIENTE", joinColumns =
            {@JoinColumn(name="ID_PRODUTO", referencedColumnName = "ID_PRODUTO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_INGREDIENTE", referencedColumnName = "ID_INGREDIENTE")}
    )
    private Set<Ingrediente> ingredientes;

    @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
    @JoinTable(name="PRODUTO_TAG", joinColumns =
            {@JoinColumn(name="ID_PRODUTO", referencedColumnName = "ID_PRODUTO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_TAG", referencedColumnName = "ID_TAG")}
    )
    private Set<Tag> tags;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_CATEGORIA", nullable = false)
    private Categoria categoria;

    @Column(name = "OBSERVACAO")
    private String observacao;


    //TODO: implementar logica que calcula o score com base nas avaliacoes dadas
    @Column(name = "SCORE")
    private float score;

    public Produto() {
        super();
    }

    /**
     * Este construtor serve para classes que tem produto como FK
     * @param id
     */
    public Produto(Long id) {
        super();
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Set<RestricaoDietetica> getRestricoesDieteticas() {
        return restricoesDieteticas;
    }

    public void setRestricoesDieteticas(Set<RestricaoDietetica> restricoesDieteticas) {
        this.restricoesDieteticas = restricoesDieteticas;
    }

    public Set<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
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
                ", ingredientes=" + ingredientes +
                ", tags=" + tags +
                ", categoria=" + categoria +
                ", observacao='" + observacao + '\'' +
                ", score=" + score +
                '}';
    }
}
