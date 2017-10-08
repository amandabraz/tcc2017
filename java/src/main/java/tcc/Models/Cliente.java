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
import java.util.Set;

@Entity
@Table(name= "CLIENTE")
public class Cliente implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_CLIENTE")
    private Long id;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_USUARIO", nullable = false)
    private Usuario usuario;


    @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
    @JoinTable(name="CLIENTE_TAG", joinColumns =
            {@JoinColumn(name="ID_CLIENTE", referencedColumnName = "ID_CLIENTE")}, inverseJoinColumns =
            {@JoinColumn(name="ID_TAG", referencedColumnName = "ID_TAG")})
    private Set<Tag> tags;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="CLIENTE_RESTRICAO", joinColumns =
            {@JoinColumn(name="ID_CLIENTE")}, inverseJoinColumns =
            {@JoinColumn(name="ID_RESTRICAO")})
    private Set<RestricaoDietetica> restricoesDieteticas;

    public Cliente() {
        this.id = id;
        this.usuario = usuario;
        this.tags = tags;
        this.restricoesDieteticas = restricoesDieteticas;
    }

    public Cliente(Long id) {
        this.id = id;
    }

    public Cliente(Usuario usuario, Set<Tag> tags, Set<RestricaoDietetica> restricaoDieteticas) {
        this.usuario = usuario;
        this.tags = tags;
        this.restricoesDieteticas = restricoesDieteticas;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", tags=" + tags +
                ", Restrições Dieteticas=" + restricoesDieteticas +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<RestricaoDietetica> getRestricoesDieteticas() {
        return restricoesDieteticas;
    }

    public void setRestricoesDieteticas(Set<RestricaoDietetica> restricoesDieteticas) {
        this.restricoesDieteticas = restricoesDieteticas;
    }
}
