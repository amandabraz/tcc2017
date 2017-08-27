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
import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * Created by amanda on 10/05/2017.
 */
@Entity
@Table(name = "VENDEDOR")
public class Vendedor implements Serializable {

    public static final Long serialVersionUID = 1L;

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
        super();
    }

    /**
     * Este construtor serve para classes que tem vendedor como FK
     * @param id
     */
    public Vendedor(Long id) {
        super();
        this.id = id;
        this.usuario = usuario;
        this.nomeFantasia = nomeFantasia;
        this.meiosPagamento = meiosPagamento;
    }


    public Vendedor(Usuario usuario, String nomeFantasia, Set<Pagamento> meiosPagamento) {
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

    public Set<Pagamento> getPagamentosAceitos() {
        return meiosPagamento;
    }

    public void setPagamentosAceitos(Set<Pagamento> meiosPagamento) {
        this.meiosPagamento = meiosPagamento;
    }

    @Override
    public String toString() {
        return "Vendedor{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                ", pagamentosAceitos=" + meiosPagamento +
                '}';
    }
}
