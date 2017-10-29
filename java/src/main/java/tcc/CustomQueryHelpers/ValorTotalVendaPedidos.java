package tcc.CustomQueryHelpers;

public class ValorTotalVendaPedidos {

    private Integer valorTotalVendido;
    private String nomeProduto;

    public ValorTotalVendaPedidos(Integer valorTotalVendido, String nomeProduto) {
        this.valorTotalVendido = valorTotalVendido;
        this.nomeProduto = nomeProduto;
    }

    public ValorTotalVendaPedidos(){
        this.valorTotalVendido = null;
        this.nomeProduto = null;
    }

    public Integer getValorTotalVendido() {
        return valorTotalVendido;
    }

    public void setValorTotalVendido(Integer valorTotalVendido) {
        this.valorTotalVendido = valorTotalVendido;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }
}
