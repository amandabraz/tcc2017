package tcc.Models;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by amanda on 04/05/2017.
 */

@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_USUARIO")
    private Long id;

    @Column(name = "SENHA", unique = true)
    private String senha;

    @Column(name = "DELETADO", nullable = false)
    private boolean deletado;

    @Column(name = "PERFIL", nullable = false)
    private char perfil;

    @Column(name = "NOME", nullable = false, length = 100)
    private String nome;

    @Column(name = "EMAIL", nullable = false, length = 256, unique = true)
    private String email;

    @Column(name = "DATA_NASC", nullable = false)
    private Date dataNasc;

    @Column(name = "LOCALIZACAO", nullable = false)
    private boolean localizacao;

    @Column(name = "NOTIFICACAO", nullable = false)
    private boolean notificacao;

    /**
     * Construtor com todos os dados para retorno do banco
     * @param id
     * @param deletado
     * @param perfil
     * @param nome
     * @param email
     * @param dataNasc
     * @param localizacao
     * @param notificacao
     */
    public Usuario(Long id, boolean deletado, char perfil, String nome, String email, Date dataNasc,
                   boolean localizacao, boolean notificacao) {
        this.id = id;
        this.deletado = deletado;
        this.perfil = perfil;
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.localizacao = localizacao;
        this.notificacao = notificacao;
    }

    /**
     * Construtor sem id para inserção em banco (id é auto gerado)
     * @param deletado
     * @param perfil
     * @param nome
     * @param email
     * @param dataNasc
     * @param localizacao
     * @param notificacao
     */
    public Usuario(boolean deletado, char perfil, String nome, String email, Date dataNasc,
                   boolean localizacao, boolean notificacao) {
        this.deletado = deletado;
        this.perfil = perfil;
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.localizacao = localizacao;
        this.notificacao = notificacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isDeletado() {
        return deletado;
    }

    public void setDeletado(boolean deletado) {
        this.deletado = deletado;
    }

    public char getPerfil() {
        return perfil;
    }

    public void setPerfil(char perfil) {
        this.perfil = perfil;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(Date dataNasc) {
        this.dataNasc = dataNasc;
    }

    public boolean isLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(boolean localizacao) {
        this.localizacao = localizacao;
    }

    public boolean isNotificacao() {
        return notificacao;
    }

    public void setNotificacao(boolean notificacao) {
        this.notificacao = notificacao;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", deletado=" + deletado +
                ", perfil=" + perfil +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", dataNasc=" + dataNasc +
                ", localizacao=" + localizacao +
                ", notificacao=" + notificacao +
                '}';
    }
}
