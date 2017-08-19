package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.UsuarioDAO;
import tcc.Models.Usuario;

/**
 * Created by amanda on 17/08/2017.
 */

@Service
public class UsuarioService {

    @Autowired
    private UsuarioDAO usuarioDAO;

    public Usuario buscaUsuario(Long id) {
        try {
            return usuarioDAO.findOne(id);
        } catch (Exception e) {
            throw e;
        }
    }
}
