import React, {
  Component
} from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View
} from 'react-native';
import {
  Button,
  Icon
} from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';
import Popup from 'react-native-popup';

class TermoUso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      };
    };

  naoAceito() {
    this.popup.confirm({
      title: 'Aceite de Termos',
      content: ['Para acesso à aplicação é necessário aceitar os Termos de Uso. Tem certeza que deseja sair?'],
      ok: {
        text: 'Continuar',
        style: {
          color: 'blue',
          fontWeight: 'bold'
        }
      },
      cancel: {
        text: 'Sair',
        style: {
          color: 'red'
        },
        callback: () => {
          {this.logout()}
        }
      }
    });
  }

  logout() {
    ToastAndroid.showWithGravity('Até logo!', ToastAndroid.LONG, ToastAndroid.CENTER);
    this.props.navigation.navigate('Login');
  }

  login = () => {
    this.props.navigation.navigate('Cadastro');
  };

  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.oneResult1}>
          <View style={{borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        padding: 10,
                        margin: 10}}>
            <Text style={{fontSize: 20,
                          padding: 5,
                          color: '#88557B',
                          alignSelf: 'center'}}>
                          Termos de Uso
            </Text>
          </View>

          <View>
            <Text style={styles.baseText}>
              {'\n'}
              AMORA é um serviço interativo oferecido em por meio de um aplicativo disposto nas bibliotecas AppleStore para iOS, e PlayStore para Android, que oferece serviço de compra e venda de alimentos artesanais, a partir da integração de diversas fontes de informação.
            </Text>
            <Text style={styles.baseText}>
              O acesso ao uso da solução tecnológica representa a aceitação expressa e irrestrita dos termos de uso abaixo descritos. Se você não concorda com os termos, selecione a opção 'Não aceito'.
              {'\n'} {'\n'}
            </Text>
            <Text style={styles.titleText}>
              O visitante poderá usar este aplicativo apenas para finalidades lícitas.
            </Text>
            <Text style={styles.baseText}>
              Este espaço não poderá ser utilizado para para publicar, enviar, distribuir ou divulgar conteúdos ou informação de caráter difamatório, obsceno ou ilícito, inclusive informações de propriedade exclusiva pertencentes a outras pessoas ou empresas, bem como marcas registradas ou informações protegidas por direitos autorais, sem a expressa autorização do detentor desses direitos. Ainda, o visitante não poderá usar esta solução para obter ou divulgar informações pessoais, inclusive endereços na Internet, sobre os usuários do site.
              {'\n'} {'\n'}
              AMORA empenha-se em manter a qualidade, atualidade e autenticidade das informações da aplicação, mas seus criadores e colaboradores não se responsabilizam por eventuais falhas nos serviços ou inexatidão das informações oferecidas. O usuário não deve ter como pressuposto que tais serviços e informações são isentos de erros ou serão adequados aos seus objetivos particulares.
              {'\n'}
              Os criadores e colaboradores tampouco assumem o compromisso de atualizar as informações, e reservam-se o direito de alterar as condições de uso ou preços dos serviços e produtos oferecidos no site a qualquer momento.
            <Text style={styles.titleText}>
              {'\n'} {'\n'}
              O acesso ao aplicativo AMORA é gratuito.
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              AMORA poderá criar áreas de acesso exclusivo aos seus clientes ou para terceiros especialmente autorizados.
              {'\n'}
              Os criadores e colaboradores do AMORA poderão a seu exclusivo critério e em qualquer tempo, modificar ou desativar o site, bem como limitar, cancelar ou suspender seu uso ou o acesso.
              {'\n'}
              Tambem estes Termos de Uso poderão ser alterados a qualquer tempo, visite regularmente esta página e consulte os Termos então vigentes.
              {'\n'}
              Algumas disposições destes Termos podem ser substituídas por termos ou avisos legais expressos localizados em determinadas páginas deste aplicativo.
              {'\n'}
            </Text>
            <Text style={styles.titleText}>
              {'\n'}
              Erros e falhas
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              Os documentos, informações, imagens e gráficos publicados neste site podem conter imprecisões técnicas ou erros tipográficos.
              Em nenhuma hipótese AMORA e/ou seus respectivos fornecedores serão responsáveis por qualquer dano direto ou indireto decorrente da impossibilidade de uso, perda de dados ou lucros, resultante do acesso e desempenho do aplicativo, dos serviços oferecidos ou de informações disponíveis neste aplicativo.
              {'\n'}
              O acesso aos serviços, materiais, informações e facilidades contidas nesta aplicação não garante a sua qualidade.
            </Text>
            <Text style={styles.titleText}>
              {'\n'}
              {'\n'}
              Limitação da responsabilidade
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              Os materiais são fornecidos nesta plataforma sem nenhuma garantia explícita ou implícita de comercialização ou adequação a qualquer objetivo específico.
              {'\n'}
              Em nenhum caso AMORA ou os seus colaboradores serão responsabilizados por quaisquer danos, incluindo lucros cessantes, interrupção de negócio, ou perda de informação que resultem do uso ou da incapacidade de usar os materiais.
              {'\n'}
              AMORA não garante a precisão ou integridade das informações, textos, gráficos, links e outros itens dos materiais.
              {'\n'}
              AMORA não se responsabiliza pelo conteúdo dos artigos e informações aqui publicadas, uma vez que os textos são de autoria de terceiros e não traduzem, necessariamente, a opinião da solução.
              {'\n'}
              AMORA tampouco é responsável pela violação de direitos autorais decorrente de informações, documentos e materiais publicados nesta plataforma, compromentendo-se a retirá-los do ar assim que notificado da infração.
            </Text>
            <Text style={styles.titleText}>
              {'\n'}
              {'\n'}
              Informações enviadas pelos usuários e colaboradores
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              Qualquer material, informação, artigos ou outras comunicações que forem transmitidas, enviadas ou publicadas neste aplicativo serão considerados informação não confidencial, e qualquer violação aos direitos dos seus criadores não será de responsabilidade do AMORA.
              {'\n'}
              É terminantemente proibido transmitir, trocar ou publicar, através desta plataforma, qualquer material de cunho obsceno, difamatório ou ilegal, bem como textos ou criações de terceiros sem a autorização do autor.
              {'\n'}
              AMORA reserva-se o direito de restringir o acesso às informações enviadas por terceiros aos seus usuários.
              {'\n'}
              AMORA poderá, mas não é obrigado, a monitorar, revistar e restringir o acesso a qualquer área no site onde usuários transmitem e trocam informações entre si, incluindo, mas não limitado a, salas de chat, centro de mensagens ou outros foruns de debates, podendo retirar do ar ou retirar o acesso a qualquer destas informações ou comunicações.
              Porém, AMORA não é responsável pelo conteúdo de qualquer uma das informações trocadas entre os usuários, sejam elas lícitas ou ilícitas.
              {'\n'}
              Links para sites de terceiros Os sites apontados não estão sob o controle de AMORA que não é responsável pelo conteúdo de qualquer outro website indicado ou acessado por meio de AMORA.
              {'\n'}
              Reserva-se o direito de eliminar qualquer link ou direcionamento a outros sites ou serviços a qualquer momento.
              {'\n'}
              AMORA não endossa firmas ou produtos indicados, acessados ou divulgados através desta plataforma, tampouco pelos anúncios aqui publicados, reservando-se o direito de publicar este alerta em suas páginas eletrônicas sempre que considerar necessário.
              {'\n'}
            </Text>
            <Text style={styles.titleText}>
              {'\n'}
              Direitos autorais e propriedade intelectual
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              Os documentos, conteúdos e criações contidos neste website pertencem aos seus criadores e colaboradores.
              {'\n'}
              A autoria dos conteúdo, material e imagens exibidos no AMORA é protegida por leis nacionais e internacionais.
              Não podem ser copiados, reproduzidos, modificados, publicados, atualizados, postados, transmitidos ou distribuídos de qualquer maneira sem autorização prévia e por escrito de AMORA.
              {'\n'}
              As imagens contidas nesta plataforma são aqui incorporadas apenas para fins de visualização, e, salvo autorização expressa por escrito, não podem ser gravadas ou baixadas via download.
              {'\n'}
              A reprodução ou armazenamento de materiais recuperados a partir deste serviço sujeitará os infratores às penas da lei.
              {'\n'}
              O nome do aplicativo AMORA, seu logotipo, o nome de domínio para acesso na Internet, bem como todos os elementos característicos da tecnologia desenvolvida e aqui apresentada, sob a forma da articulação de bases de dados, constituem marcas registradas e propriedades intelectuais privadas e todos os direitos decorrentes de seu registro são assegurados por lei.
              {'\n'}
              Alguns direitos de uso podem ser cedidos por AMORA em contrato ou licença especial, que pode ser cancelada a qualquer momento se não cumpridos os seus termos.
              {'\n'}
              As marcas registradas do AMORA só podem ser usadas publicamente com autorização expressa.
              {'\n'}
              O uso destas marcas registradas em publicidade e promoção de produtos deve ser adequadamente informado.
              {'\n'}
            </Text>
            <Text style={styles.titleText}>
              {'\n'}
              Reclamações sobre violação de direitos autorais
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              AMORA respeita a propriedade intelectual de outras pessoas ou empresas e solicitamos aos nossos membros que façam o mesmo.
              {'\n'}
              Toda e qualquer violação de direitos autorais deverá ser notificada ao AMORA e acompanhada dos documentos e informações que confirmam a autoria.
              {'\n'}
              Notificações poderão ser enviada para os e-mails constantes do aplicativo.
              {'\n'}
            </Text>
            <Text style={styles.titleText}>
              {'\n'}
              Leis aplicáveis
              {'\n'}
            </Text>
            <Text style={styles.baseText}>
              Este site é controlado e operado por AMORA a partir de seu escritório na cidade de Campinas, estado de São Paulo, e não garante que o conteúdo ou materiais estejam disponíveis para uso em outras localidades.
              {'\n'}
              Seu acesso é proibido em territórios onde o conteúdo seja considerado ilegal.
              {'\n'}
              Aqueles que optarem por acessar esta solução a partir de outras localidades o farão por iniciativa própria, e serão responsáveis pelo cumprimento das leis locais aplicáveis.
              {'\n'}
              Os materiais não deverão ser usados ou exportados em descumprimento das leis brasileiras sobre exportação.
              {'\n'}
              Qualquer pendência com relação aos materiais será dirimida pelas leis brasileiras.
              {'\n'}
              {'\n'}
              O acesso ao AMORA representa a aceitação expressa e irrestrita dos termos de uso acima descritos.
            </Text>
            {'\n'}
            {'\n'}
          </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button buttonStyle={{width: '75%'}}
                    title ="Não aceito"
                    color="#fff"
                    backgroundColor="#768888"
                    borderRadius={10}
                    onPress={this.naoAceito.bind(this)}
            />

            <Button buttonStyle={{width: '75%'}}
                    title="Aceito"
                    color="#fff"
                    backgroundColor="#88557B"
                    borderRadius={10}
                    onPress={() => this.login()}
            />
          </View>
        </View>
      </ScrollView>
      <Popup ref={popup => this.popup = popup }/>
    </View>
    )
  }
}

const titleConfig = {
  title: 'Termos de Uso',
  tintColor: "#DCDCDC",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  oneResult1:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '95%'
  },
  baseText: {
    fontSize: 12,
    textAlign: 'center'
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

AceiteTermoUso.defaultProps = { ...AceiteTermoUso };

export default AceiteTermoUso;
