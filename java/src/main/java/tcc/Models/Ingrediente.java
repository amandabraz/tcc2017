package tcc.Models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by larissa on 24/05/17.
 */

@Entity
@Table(name = "INGREDIENTE")
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_INGREDIENTE")
    private Long id;

    @Column(name = "ITEM",
            nullable = false,
            length = 100)
    private String item;

    public Ingrediente() {
        super();
    }

    public Ingrediente(Long id) {
        super();
        this.id = id;
    }

    public Ingrediente(Long id, String item) {
        this.id = id;
        this.item = item;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    @Override
    public String toString() {
        return "Ingrediente{" +
                "id=" + id +
                ", item='" + item + '\'' +
                '}';
    }
}
