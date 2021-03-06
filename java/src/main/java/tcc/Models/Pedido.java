package tcc.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "PEDIDO")
public class Pedido implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID_PEDIDO")
    public Long id;

    @Column(name = "STATUS", nullable = false)
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_FINALIZACAO")
    private Date dataFinalizacao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_CONFIRMACAO")
    private Date dataConfirmacao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_SOLICITADA",
            nullable = false)
    private Date dataSolicitada;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_AVALIADO",
            nullable = true)
    private Date dataAvaliado;

    @Column(name = "QUANTIDADE",
            nullable = false)
    private int quantidade;

    @Column(name = "VALOR_COMPRA",
            nullable = false)
    private float valorCompra;

    @Column(name = "DELETADO",
            nullable = false)
    private boolean deletado = false;

    @Column(name = "TOKEN", nullable = false)
    private String token;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_PRODUTO", nullable = false)
    private Produto produto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FK_CLIENTE", nullable = false)
    public Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_PAGAMENTO", nullable = false)
    public Pagamento pagamento;

    @Column(name = "NOTA", nullable = true)
    public Integer nota = 0;

    @Column(name = "COMENTARIO_AVALIACAO",
            nullable = true,
            length = 500)
    private String comentarioAvaliacao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDataFinalizacao() {
        return dataFinalizacao;
    }

    public void setDataFinalizacao(Date dataFinalizacao) {
        this.dataFinalizacao = dataFinalizacao;
    }

    public Date getDataConfirmacao() {
        return dataConfirmacao;
    }

    public void setDataConfirmacao(Date dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }

    public Date getDataSolicitada() {
        return dataSolicitada;
    }

    public void setDataSolicitada(Date dataSolicitada) {
        this.dataSolicitada = dataSolicitada;
    }

    public Date getDataAvaliado() {
        return dataAvaliado;
    }

    public void setDataAvaliado(Date dataAvaliado) {
        this.dataAvaliado = dataAvaliado;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public float getValorCompra() {
        return valorCompra;
    }

    public void setValorCompra(float valorCompra) {
        this.valorCompra = valorCompra;
    }

    public boolean isDeletado() {
        return deletado;
    }

    public void setDeletado(boolean deletado) {
        this.deletado = deletado;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getComentarioAvaliacao() {
        return comentarioAvaliacao;
    }

    public void setComentarioAvaliacao(String comentarioAvaliacao) {
        this.comentarioAvaliacao = comentarioAvaliacao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pedido pedido = (Pedido) o;
        return quantidade == pedido.quantidade &&
                Float.compare(pedido.valorCompra, valorCompra) == 0 &&
                deletado == pedido.deletado &&
                nota == pedido.nota &&
                Objects.equals(id, pedido.id) &&
                Objects.equals(status, pedido.status) &&
                Objects.equals(dataFinalizacao, pedido.dataFinalizacao) &&
                Objects.equals(dataConfirmacao, pedido.dataConfirmacao) &&
                Objects.equals(dataSolicitada, pedido.dataSolicitada) &&
                Objects.equals(dataAvaliado, pedido.dataAvaliado) &&
                Objects.equals(token, pedido.token) &&
                Objects.equals(produto, pedido.produto) &&
                Objects.equals(cliente, pedido.cliente) &&
                Objects.equals(pagamento, pedido.pagamento) &&
                Objects.equals(comentarioAvaliacao, pedido.comentarioAvaliacao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, dataFinalizacao, dataConfirmacao, dataSolicitada, dataAvaliado, quantidade, valorCompra, deletado, token, produto, cliente, pagamento, nota, comentarioAvaliacao);
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", dataFinalizacao=" + dataFinalizacao +
                ", dataConfirmacao=" + dataConfirmacao +
                ", dataSolicitada=" + dataSolicitada +
                ", dataAvaliado=" + dataAvaliado +
                ", quantidade=" + quantidade +
                ", valorCompra=" + valorCompra +
                ", deletado=" + deletado +
                ", token='" + token + '\'' +
                ", produto=" + produto +
                ", cliente=" + cliente +
                ", pagamento=" + pagamento +
                ", nota=" + nota +
                ", comentarioAvaliacao=" + comentarioAvaliacao +
                '}';
    }

    public Pedido(Long id) {
        super();
        this.id = id;
    }

    public Pedido() {
        super();
    }

}
