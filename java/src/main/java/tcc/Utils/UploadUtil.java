package tcc.Utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.Map;

/**
 * Arquivo para fazer upload de imagens ao Cloudinary
 */
public final class UploadUtil {

    public static String uploadFoto(String imagemUri) throws IOException {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "foodertcc",
                "api_key", "474921268333389",
                "api_secret", "lJPsEUhmWOzCWgTx8Mq7NS7LuSA"));
        try {
            Map result = cloudinary.uploader().upload(imagemUri, ObjectUtils.emptyMap());
            String url = (String) result.get("secure_url");
            System.out.println("Uploaded photo: " + url);
            return url;
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
    }
}
