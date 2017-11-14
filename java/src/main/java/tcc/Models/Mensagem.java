package tcc.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by amanda on 13/11/2017.
 */
@Entity
@Table(name = "MENSAGEM")
public class Mensagem implements Serializable {
    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_MENSAGEM")
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_MSG")
    private Date dataMsg;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_PEDIDO", nullable = false)
    private Pedido pedido;

    @Column(name = "ID_RECEIVER", nullable = false)
    private Long receiver;

    @Column(name = "ID_SENDER", nullable = false)
    public Long sender;

    @Column(name = "CONTEUDO", nullable = false)
    public String conteudo;

    public Mensagem() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDataMsg() {
        return dataMsg;
    }

    public void setDataMsg(Date dataMsg) {
        this.dataMsg = dataMsg;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public String getConteudo() {
        return conteudo;
    }

    public Long getReceiver() {
        return receiver;
    }

    public void setReceiver(Long receiver) {
        this.receiver = receiver;
    }

    public Long getSender() {
        return sender;
    }

    public void setSender(Long sender) {
        this.sender = sender;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }
}
