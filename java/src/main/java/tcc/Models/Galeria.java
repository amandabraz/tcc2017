package tcc.Models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by amanda on 21/08/2017.
 */
@Entity
@Table(name = "GALERIA")
public class Galeria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_GALERIA")
    public long id;

    @Column(name = "IMAGEM")
    public String imagem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_PRODUTO", nullable = false)
    public Produto produto;

    public Galeria() {
        super();
    }

    public Galeria(String imagem, Produto produto) {
        this.imagem = imagem;
        this.produto = produto;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}
