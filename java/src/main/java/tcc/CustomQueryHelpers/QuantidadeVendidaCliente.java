package tcc.CustomQueryHelpers;


public class QuantidadeVendidaCliente {
    private int quantidadeVendida;
    private int numeroClientes;
    private float valorRecebido;
    private int clienteConquistados;
    private float ticketMedio;

    public QuantidadeVendidaCliente() {
    }

    public int getQuantidadeVendida() {
        return quantidadeVendida;
    }

    public void setQuantidadeVendida(int quantidadeVendida) {
        this.quantidadeVendida = quantidadeVendida;
    }

    public int getNumeroClientes() {
        return numeroClientes;
    }

    public void setNumeroClientes(int numeroClientes) {
        this.numeroClientes = numeroClientes;
    }

    public float getValorRecebido() {
        return valorRecebido;
    }

    public void setValorRecebido(float valorRecebido) {
        this.valorRecebido = valorRecebido;
    }

    public int getClienteConquistados() {
        return clienteConquistados;
    }

    public void setClienteConquistados(int clienteConquistados) {
        this.clienteConquistados = clienteConquistados;
    }

    public float getTicketMedio() {
        return ticketMedio;
    }

    public void setTicketMedio(float ticketMedio) {
        this.ticketMedio = ticketMedio;
    }
}
