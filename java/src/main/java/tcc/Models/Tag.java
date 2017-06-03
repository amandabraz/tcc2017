package tcc.Models;

import javax.persistence.*;
import java.util.List;

/**
 * Created by aline on 17/05/17.
 */

@Entity
@Table(name= "TAG")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_TAG")
    private Long id;

    @ManyToMany(mappedBy="tags")
    private List<Cliente> clientes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List getClientes() {
        return clientes;
    }

    public void setClientes(List clientes) {
        this.clientes = clientes;
    }

    public Tag(Long id, List clientes) {
        this.id = id;
        this.clientes = clientes;
    }
}
