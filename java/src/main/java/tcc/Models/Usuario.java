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

    @Column(name = "BLOQUEADO", nullable = false)
    private boolean bloqueado;

    /**
     * Construtor com todos os dados para retorno do banco
     * @param id
     * @param senha
     * @param deletado
     * @param perfil
     * @param nome
     * @param email
     * @param dataNasc
     * @param localizacao
     * @param notificacao
     * @param bloqueado
     */
    public Usuario(Long id, String senha, boolean deletado, char perfil, String nome, String email, Date dataNasc,
                   boolean localizacao, boolean notificacao, boolean bloqueado) {
        this.id = id;
        this.senha = senha;
        this.deletado = deletado;
        this.perfil = perfil;
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.localizacao = localizacao;
        this.notificacao = notificacao;
        this.bloqueado = bloqueado;
    }

    /**
     * Construtor sem id para inserção em banco (id é auto gerado)
     * @param senha
     * @param deletado
     * @param perfil
     * @param nome
     * @param email
     * @param dataNasc
     * @param localizacao
     * @param notificacao
     * @param bloqueado
     */
    public Usuario(String senha,  boolean deletado, char perfil, String nome, String email, Date dataNasc,
                   boolean localizacao, boolean notificacao, boolean bloqueado) {
        this.senha = senha;
        this.deletado = deletado;
        this.perfil = perfil;
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.localizacao = localizacao;
        this.notificacao = notificacao;
        this.bloqueado = bloqueado;
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isBloqueado() {
        return bloqueado;
    }

    public void setBloqueado(boolean bloqueado) {
        this.bloqueado = bloqueado;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", senha=" + senha +
                ", deletado=" + deletado +
                ", perfil=" + perfil +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", dataNasc=" + dataNasc +
                ", localizacao=" + localizacao +
                ", notificacao=" + notificacao +
                ", bloqueado=" + bloqueado +
                '}';
    }
}
