package tcc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tcc.DAOs.UsuarioDAO;
import tcc.ErrorHandling.CustomError;
import tcc.Models.Usuario;
import tcc.Utils.UploadUtil;

import java.io.IOException;
import java.util.Objects;

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

    public Usuario editaUsuario(Usuario usuario) throws IOException {
        try {
            Usuario usuarioExistente = buscaUsuario(usuario.getId();
            if (Objects.isNull(usuarioExistente))) {
                return null;
            }
            if (!StringUtils.isEmpty(usuario.getImagemPerfil()) &&
                    (Objects.isNull(usuario.getId()) ||
                            !usuario.getImagemPerfil().equals(usuarioExistente.getImagemPerfil()))) {
                usuario.setImagemPerfil(UploadUtil.uploadFoto(usuario.getImagemPerfil()));
            }
            return usuarioDAO.save(usuario);
        } catch (Exception e) {
            throw e;
        }
    }

    public Usuario deletaUsuario(Long id) {
        try {
            Usuario deletarPerfil = usuarioDAO.findOne(id);
                deletarPerfil.setDeletado(true);
            return usuarioDAO.save(deletarPerfil);
        } catch (Exception e) {
            throw e;
        }
    }

    public Usuario reativarPerfil(Long id) {
        try {
            Usuario reativarPerfil = usuarioDAO.findOne(id);
            reativarPerfil.setDeletado(false);
            return usuarioDAO.save(reativarPerfil);
        } catch (Exception e) {
            throw e;
        }
    }
}
