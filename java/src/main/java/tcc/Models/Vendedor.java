package tcc.Models;

import javax.persistence.*;

/**
 * Created by amanda on 10/05/2017.
 */
@Entity
@Table(name = "VENDEDOR")
public class Vendedor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_VENDEDOR")
    private Long id;

    @OneToOne
    @JoinColumn(name = "FK_USUARIO")
    private Usuario usuario;

    @Column(name = "NOME_FANTASIA", nullable = true, length = 100)
    private String nomeFantasia;

    @Column(name = "CPF", nullable = false, length = 11, unique = true)
    private String cpf;

    @Transient
    private Long fkRestricaoDietetica;

    @Transient
    //@Column(name = "VISUALIZA_ESTATISTICAS", nullable = false)
    private boolean visualizaEstatisticas;

    public Vendedor(Usuario usuario, String nomeFantasia, String cpf) {
        this.usuario = usuario;
        this.nomeFantasia = nomeFantasia;
        this.cpf = cpf;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Long getFkRestricaoDietetica() {
        return fkRestricaoDietetica;
    }

    public void setFkRestricaoDietetica(Long fkRestricaoDietetica) {
        this.fkRestricaoDietetica = fkRestricaoDietetica;
    }

    public boolean isVisualizaEstatisticas() {
        return visualizaEstatisticas;
    }

    public void setVisualizaEstatisticas(boolean visualizaEstatisticas) {
        this.visualizaEstatisticas = visualizaEstatisticas;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Vendedor{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", nomeFantasia='" + nomeFantasia + '\'' +
                ", cpf='" + cpf + '\'' +
                ", fkRestricaoDietetica=" + fkRestricaoDietetica +
                ", visualizaEstatisticas=" + visualizaEstatisticas +
                '}';
    }
}
