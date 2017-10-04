package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.LocalizacaoDAO;
import tcc.Models.Localizacao;
import tcc.Models.Usuario;
import tcc.Models.Vendedor;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class LocalizacaoService {

    @Autowired
    private LocalizacaoDAO localizacaoDAO;

    /**
     * Remove uma lista de localizações, passadas por parâmetro.
     * @param localizacoesASeremApagadas localizacoes a serem apagadas
     */
    private void removeLocalizacao(List<Localizacao> localizacoesASeremApagadas) {
        localizacaoDAO.delete(localizacoesASeremApagadas);
    }

    /**
     * Remove uma localização, passada por parâmetro.
     * @param localizacaoASerApagada localizacao a ser apagada
     */
    private void removeLocalizacao(Localizacao localizacaoASerApagada) {
        localizacaoDAO.delete(localizacaoASerApagada);
    }

    /**
     * Salva uma nova localizacao de acordo com o usuário.
     * @param novaLocalizacao
     */
    public Localizacao salvaNovaLocalizacao(Localizacao novaLocalizacao) {
        return localizacaoDAO.save(novaLocalizacao);
    }

    /**
     * Verifica se é necessário limpar as localizações de determinado usuário no banco antes de salvar alguma nova.
     * @param userToSearch usuário a ser buscado na tabela de localização.
     */
    public void removeLocalizacaoAntiga(Usuario userToSearch){
        List<Localizacao> localizationsFromUser = localizacaoDAO.findByUsuario(userToSearch); //localizações do usuário

        Calendar cal = Calendar.getInstance(); //hoje
        cal.add(Calendar.MONTH, -1); //um mês atrás
        Date dateToSearch = cal.getTime(); //data de um mês atrás

        List<Localizacao> localizacoesAntigas =  localizationsFromUser.stream()
                .filter(loc -> loc.getHorario().before(dateToSearch)) //filtro pra caso exista alguma localização anterior
                .collect(Collectors.toList());
        if(!localizacoesAntigas.isEmpty()){
            removeLocalizacao(localizacoesAntigas);
        }
    }

    public Localizacao encontraLocalizacaoRecenteVendedor(Vendedor vendedor) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR_OF_DAY, -6);
            Date seisHorasAtras = calendar.getTime();
            Localizacao localizacaoMaisRecente = localizacaoDAO.findFirstByUsuarioOrderByHorarioDesc(vendedor.getUsuario());
            if (Objects.nonNull(localizacaoMaisRecente)
                    && localizacaoMaisRecente.getHorario().after(seisHorasAtras)) {
                return localizacaoMaisRecente;
            }
            return null;
        } catch (Exception e) {
            throw e;
        }
    }

    public static double calcularDistancia(double lat1, double lon1, double el1,
                                           double lat2, double lon2, double el2) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        double height = el1 - el2;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.round(Math.sqrt(distance));
    }
}
