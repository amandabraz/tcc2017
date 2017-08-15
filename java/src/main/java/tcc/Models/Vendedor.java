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
import java.util.List;

/**
 * Created by amanda on 10/05/2017.
 */
@Entity
@Table(name = "VENDEDOR")
public class Vendedor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_VENDEDOR")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_USUARIO", referencedColumnName = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NOME_FANTASIA", nullable = true, length = 100)
    private String nomeFantasia;

    @ManyToMany
    @JoinTable(name = "PAGAMENTOS_ACEITOS",
            joinColumns = { @JoinColumn(name = "ID_VENDEDOR") },
            inverseJoinColumns = { @JoinColumn(name = "ID_PAGAMENTO") })
    private List<Pagamento> pagamentosAceitos;

    public Vendedor() {
        this.id = id;
        this.usuario = usuario;
        this.nomeFantasia = nomeFantasia;
        this.pagamentosAceitos = pagamentosAceitos;
    }

    public Vendedor(Usuario usuario, String nomeFantasia) {
        this.usuario = usuario;
        this.nomeFantasia = nomeFantasia;
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

    public List<Pagamento> getPagamentosAceitos() {
        return pagamentosAceitos;
    }

    public void setPagamentosAceitos(List<Pagamento> pagamentosAceitos) {
        this.pagamentosAceitos = pagamentosAceitos;
    }

    @Override
    public String toString() {
        return "Vendedor{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                ", pagamentosAceitos=" + pagamentosAceitos +
                '}';
    }
}
