package tcc.Models;


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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "VENDEDOR")
public class Vendedor implements Serializable {

    public static final Long serialVersionUID = 1L;

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
    @Column(name = "ID_VENDEDOR")
    private Long id;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NOME_FANTASIA", nullable = true, length = 100)
    private String nomeFantasia;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "VENDEDOR_PAGAMENTO", joinColumns =
            {@JoinColumn(name = "ID_VENDEDOR")}, inverseJoinColumns =
            {@JoinColumn(name = "ID_PAGAMENTO")})
    private Set<Pagamento> meiosPagamento;


    public Vendedor() {
        this.id = id;
        this.usuario = usuario;
        this.nomeFantasia = nomeFantasia;
        this.meiosPagamento = meiosPagamento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public Set<Pagamento> getMeiosPagamento() {
        return meiosPagamento;
    }

    public void setMeiosPagamento(Set<Pagamento> meiosPagamento) {
        this.meiosPagamento = meiosPagamento;
    }
}
