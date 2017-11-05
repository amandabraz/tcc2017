package tcc.CustomQueryHelpers;


public class RankingProdutosVendidos {


    private String nomeProduto;
    private int quantidadeVendida;

    public RankingProdutosVendidos() {

    }

    public int getQuantidadeVendida() {
        return quantidadeVendida;
    }

    public void setQuantidadeVendida(int quantidadeVendida) {
        this.quantidadeVendida = quantidadeVendida;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

}
