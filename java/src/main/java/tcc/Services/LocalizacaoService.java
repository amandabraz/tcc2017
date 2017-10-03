package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.LocalizacaoDAO;
import tcc.Models.Localizacao;
import tcc.Models.Usuario;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
}
