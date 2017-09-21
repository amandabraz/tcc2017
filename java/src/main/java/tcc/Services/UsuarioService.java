package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
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

    public CustomError validaUsuario(Usuario usuario) {
        Usuario usuarioBuscado = usuarioDAO.findByEmail(usuario.getEmail());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            return new CustomError("E-mail já cadastrado!");
        }
        usuarioBuscado = usuarioDAO.findByCpf(usuario.getCpf());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            return new CustomError("CPF já cadastrado!");
        }
        usuarioBuscado = usuarioDAO.findByDddAndTelefone(usuario.getDdd(), usuario.getTelefone());
        if (usuarioBuscado != null && usuarioBuscado.getId() > 0) {
            return new CustomError("Celular já cadastrado!");
        }
        return null;
    }

    public Usuario salvaUsuario(Usuario usuario) {
        try {
            return usuarioDAO.save(usuario);
        } catch (Exception e) {
            throw e;
        }
    }
}
