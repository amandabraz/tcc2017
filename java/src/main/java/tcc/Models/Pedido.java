package tcc.Models;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

public class Pedido implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "STATUS")
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_FINALIZACAO",
            nullable = false)
    private Date dataFinalizacao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_CONFIRMACAO",
            nullable = false)
    private Date dataConfirmacao;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATA_SOLICITADA",
            nullable = false)
    private Date dataSolicitada;

    @Column(name = "QUANTIDADE",
            nullable = false)
    private int quantidade;

    @Column(name = "VALOR_COMPRA",
            nullable = false)
    private float valorCompra;

    @Column(name = "DELETADO",
            nullable = false)
    private boolean deletado = false;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TOKEN")
    private Long token;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="PEDIDO_PRODUTO", joinColumns =
            {@JoinColumn(name="ID_PEDIDO", referencedColumnName = "ID_PEDIDO")}, inverseJoinColumns =
            {@JoinColumn(name="ID_PRODUTO", referencedColumnName = "ID_PRODUTO")})
    private Set<Produto> produtos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_CLIENTE", nullable = false)
    public Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FK_PAGAMENTO", nullable = false)
    public Pagamento pagamento;

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

    public Long getToken() {
        return token;
    }

    public void setToken(Long token) {
        this.token = token;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pedido pedido = (Pedido) o;
        return quantidade == pedido.quantidade &&
                Float.compare(pedido.valorCompra, valorCompra) == 0 &&
                deletado == pedido.deletado &&
                Objects.equals(id, pedido.id) &&
                Objects.equals(status, pedido.status) &&
                Objects.equals(dataFinalizacao, pedido.dataFinalizacao) &&
                Objects.equals(dataConfirmacao, pedido.dataConfirmacao) &&
                Objects.equals(dataSolicitada, pedido.dataSolicitada) &&
                Objects.equals(token, pedido.token) &&
                Objects.equals(produtos, pedido.produtos) &&
                Objects.equals(cliente, pedido.cliente) &&
                Objects.equals(pagamento, pedido.pagamento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, dataFinalizacao, dataConfirmacao, dataSolicitada, quantidade, valorCompra, deletado, token, produtos, cliente, pagamento);
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", dataFinalizacao=" + dataFinalizacao +
                ", dataConfirmacao=" + dataConfirmacao +
                ", dataSolicitada=" + dataSolicitada +
                ", quantidade=" + quantidade +
                ", valorCompra=" + valorCompra +
                ", deletado=" + deletado +
                ", token=" + token +
                ", produtos=" + produtos +
                ", cliente=" + cliente +
                ", pagamento=" + pagamento +
                '}';
    }

    public Pedido(Long id) {
        this.id = id;
    }

    public Pedido() {
        super();
    }
}
