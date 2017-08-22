package tcc.Models;

import javax.persistence.*;

/**
 * Created by larissa on 24/05/17.
 */

@Entity
@Table(
        name = "INGREDIENTE"
)
public class Ingrediente {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    @Column(
            name = "ID_INGREDIENTE"
    )
    private long id;

    @Column(
            name = "ITEM",
            nullable = false,
            length = 100
    )
    private String item;

    public Ingrediente(long id, String item) {
        this.id = id;
        this.item = item;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
