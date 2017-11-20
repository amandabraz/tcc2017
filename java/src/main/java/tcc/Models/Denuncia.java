package tcc.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

/**
 * Created by amanda on 20/11/2017.
 */
@Entity
@Table(name = "DENUNCIA")
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_DENUNCIA")
    public Long id;

    @Column(name = "MOTIVO", nullable = false, length = 500)
    private String motivo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_DENUNCIA")
    private Date dataDenuncia;

    @Column(name = "ID_REPORTADO", nullable = false)
    private Long reportado;

    @Column(name = "ID_DENUNCIADOR", nullable = false)
    public Long denunciador;

    public Denuncia() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public Date getDataDenuncia() {
        return dataDenuncia;
    }

    public void setDataDenuncia(Date dataDenuncia) {
        this.dataDenuncia = dataDenuncia;
    }

    public Long getReportado() {
        return reportado;
    }

    public void setReportado(Long reportado) {
        this.reportado = reportado;
    }

    public Long getDenunciador() {
        return denunciador;
    }

    public void setDenunciador(Long denunciador) {
        this.denunciador = denunciador;
    }
}
