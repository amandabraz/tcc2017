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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "AVALIACAO")
public class Avaliacao {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="REG_DATE")
    public Date regDate;

    @Column(name="REG_USER")
    public Long regUser;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="MOD_DATE")
    public Date modDate;

    @Column(name="MOD_USER")
    public Long modUser;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_AVALIACAO")
    public Long id;

    @Column(name = "NOTA")
    public float nota;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_PRODUTO", nullable = false)
    public Produto produto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AVALIADOR", nullable = false)
    public Cliente cliente;

    public Avaliacao(Long id) {
        super();
        this.id = id;
    }

    public Avaliacao() {
        super();
    }

    public Avaliacao(Date regDate, Long regUser, Date modDate, Long modUser, float nota, Produto produto, Cliente cliente) {
        this.regDate = regDate;
        this.regUser = regUser;
        this.modDate = modDate;
        this.modUser = modUser;
        this.nota = nota;
        this.produto = produto;
        this.cliente = cliente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getNota() {
        return nota;
    }

    public void setNota(float nota) {
        this.nota = nota;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }

    public Long getRegUser() {
        return regUser;
    }

    public void setRegUser(Long regUser) {
        this.regUser = regUser;
    }

    public Date getModDate() {
        return modDate;
    }

    public void setModDate(Date modDate) {
        this.modDate = modDate;
    }

    public Long getModUser() {
        return modUser;
    }

    public void setModUser(Long modUser) {
        this.modUser = modUser;
    }
}
