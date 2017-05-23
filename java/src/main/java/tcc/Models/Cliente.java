package tcc.Models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by aline on 17/05/17.
 */

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

    @ManyToMany
    @JoinTable(name="CLIENTE_TAG", joinColumns =
            {@JoinColumn(name="ID_CLIENTE")}, inverseJoinColumns =
            {@JoinColumn(name="TAG_ID")}
        )
    private List<Tag> tags;

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", tags=" + tags +
                '}';
    }


    public Cliente() {
        this.id = id;
        this.usuario = usuario;
        this.tags = tags;
    }


    /**
     * Construtor sem id para inserção em banco (id é auto gerado)
     * @param tags
     */
    public Cliente(Usuario usuario, List<Tag> tags) {
        this.usuario = usuario;
        this.tags = tags;
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
}
