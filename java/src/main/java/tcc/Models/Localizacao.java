package tcc.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "LOCALIZACAO")
public class Localizacao implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "LATITUDE", nullable = false)
    private Float latitude;

    @Column(name = "LONGITUDE", nullable = false)
    private Float longitude;

    @Column(name = "PRECISAO_MTS", nullable = false)
    private Integer precisao_mts;

    @Column(name = "ALTITUDE", nullable = false)
    private Float altitude;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "HORARIO", nullable = false)
    private Date horario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_USUARIO", nullable = false)
    public Usuario usuario;

    public Localizacao() {
        super();
    }

    public Localizacao(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Integer getPrecisao_mts() {
        return precisao_mts;
    }

    public void setPrecisao_mts(Integer precisao_mts) {
        this.precisao_mts = precisao_mts;
    }

    public Float getAltitude() {
        return altitude;
    }

    public void setAltitude(Float altitude) {
        this.altitude = altitude;
    }

    public Date getHorario() {
        return horario;
    }

    public void setHorario(Date horario) {
        this.horario = horario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Localizacao that = (Localizacao) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(latitude, that.latitude) &&
                Objects.equals(longitude, that.longitude) &&
                Objects.equals(precisao_mts, that.precisao_mts) &&
                Objects.equals(altitude, that.altitude) &&
                Objects.equals(horario, that.horario) &&
                Objects.equals(usuario, that.usuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, latitude, longitude, precisao_mts, altitude, horario, usuario);
    }

    @Override
    public String toString() {
        return "Localizacao{" +
                "id=" + id +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", precisao_mts=" + precisao_mts +
                ", altitude=" + altitude +
                ", horario=" + horario +
                ", usuario=" + usuario +
                '}';
    }
}
