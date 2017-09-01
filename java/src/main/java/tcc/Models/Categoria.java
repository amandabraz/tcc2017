package tcc.Models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by larissa on 24/05/17.
 */

@Entity
@Table(name = "CATEGORIA")
public class Categoria implements Serializable {

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
    @Column(name = "ID_CATEGORIA")
    private Long id;

    @Column(name = "DESCRICAO", unique = true)
    private String descricao;

    public Categoria() {
        super();
    }

    /**
     * Este construtor serve para classes que tem categoria como FK
     * @param id
     */
    public Categoria(Long id) {
        super();
        this.id = id;
    }

    public Categoria(long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Categoria(String descricao) {
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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

    @Override
    public String toString() {
        return "Categoria{" +
                "regDate=" + regDate +
                ", regUser=" + regUser +
                ", modDate=" + modDate +
                ", modUser=" + modUser +
                ", id=" + id +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
