package tcc.Models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by larissa on 24/05/17.
 */

@Entity
@Table(name = "INGREDIENTE")
public class Ingrediente implements Serializable {

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
    public Ingrediente(String item) {
        super();
        this.item = item;
    }

    public Ingrediente(Date regDate, Long regUser, Date modDate, Long modUser, Long id, String item) {
        this.regDate = regDate;
        this.regUser = regUser;
        this.modDate = modDate;
        this.modUser = modUser;
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
