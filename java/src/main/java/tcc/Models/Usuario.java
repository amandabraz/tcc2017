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
import java.util.Objects;

@Entity
@Table(name = "USUARIO")
public class Usuario  implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_USUARIO")
    private Long id;

    @Column(name = "SENHA")
    private String senha;

    @Column(name = "DELETADO", nullable = false)
    private boolean deletado;

    @Column(name = "PERFIL", nullable = false)
    private char perfil;

    @Column(name = "NOME", nullable = false, length = 100)
    private String nome;

    @Column(name = "EMAIL", nullable = false, length = 256, unique = true)
    private String email;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_NASC", nullable = false)
    private Date dataNasc;

    @Column(name = "CPF", columnDefinition = "varchar(11)  NOT NULL UNIQUE", insertable = true, updatable = false)
    private String cpf = "00000000000";

    @Column(name = "ddd", nullable = false, length = 2)
    private String ddd;

    @Column(name = "TELEFONE", nullable = false, length = 9)
    private String telefone;

    @Column(name = "BLOQUEADO", nullable = false)
    private boolean bloqueado;

    @Column(name = "imagem_perfil", nullable = true)
    private String imagemPerfil;

    @Column(name = "fcm_token", nullable = true, length = 152)
    private String token;

    /**
     * Construtor com todos os dados para retorno do banco
     */
    public Usuario() {
        super();
    }

    /**
     * Este construtor serve para classes que tem usuario como FK
     * @param id
     */
    public Usuario(Long id) {
        super();
        this.id = id;
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getDdd() {
        return ddd;
    }

    public void setDdd(String ddd) {
        this.ddd = ddd;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
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

    public String getImagemPerfil() {
        return imagemPerfil;
    }

    public void setImagemPerfil(String imagemPerfil) {
        this.imagemPerfil = imagemPerfil;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return deletado == usuario.deletado &&
                perfil == usuario.perfil &&
                bloqueado == usuario.bloqueado &&
                Objects.equals(id, usuario.id) &&
                Objects.equals(senha, usuario.senha) &&
                Objects.equals(nome, usuario.nome) &&
                Objects.equals(email, usuario.email) &&
                Objects.equals(dataNasc, usuario.dataNasc) &&
                Objects.equals(cpf, usuario.cpf) &&
                Objects.equals(ddd, usuario.ddd) &&
                Objects.equals(telefone, usuario.telefone) &&
                Objects.equals(imagemPerfil, usuario.imagemPerfil) &&
                Objects.equals(token, usuario.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, senha, deletado, perfil, nome, email, dataNasc, cpf, ddd, telefone, bloqueado, imagemPerfil, token);
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", senha='" + senha + '\'' +
                ", deletado=" + deletado +
                ", perfil=" + perfil +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", dataNasc=" + dataNasc +
                ", cpf='" + cpf + '\'' +
                ", ddd='" + ddd + '\'' +
                ", telefone='" + telefone + '\'' +
                ", bloqueado=" + bloqueado +
                ", imagemPerfil='" + imagemPerfil + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
