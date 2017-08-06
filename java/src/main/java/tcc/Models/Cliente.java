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
import java.util.List;

@Entity
@Table(name= "CLIENTE")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_CLIENTE")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_USUARIO", nullable = false)
    private Usuario usuario;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="CLIENTE_TAG", joinColumns =
            {@JoinColumn(name="ID_CLIENTE")}, inverseJoinColumns =
            {@JoinColumn(name="ID_TAG")}
        )
    private List<Tag> tags;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="CLIENTE_RESTRICAO", joinColumns =
            {@JoinColumn(name="ID_CLIENTE")}, inverseJoinColumns =
            {@JoinColumn(name="ID_RESTRICAO")}
    )
    private List<RestricaoDietetica> restricaoDieteticas;

    public Cliente() {
        this.id = id;
        this.usuario = usuario;
        this.tags = tags;
        this.restricaoDieteticas = restricaoDieteticas;
    }

    public Cliente(Long id, Usuario usuario, List<Tag> tags, List<RestricaoDietetica> restricaoDieteticas) {
        this.id = id;
        this.usuario = usuario;
        this.tags = tags;
        this.restricaoDieteticas = restricaoDieteticas;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Long getId() {
        return id;
    }

    public List getTags() {
        return tags;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<RestricaoDietetica> getRestricaoDieteticas() {
        return restricaoDieteticas;
    }

    public void setRestricaoDieteticas(List<RestricaoDietetica> restricaoDieteticas) {
        this.restricaoDieteticas = restricaoDieteticas;
    }
}
