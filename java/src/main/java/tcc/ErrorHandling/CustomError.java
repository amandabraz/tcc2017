package tcc.ErrorHandling;

/**
 * Created by amanda on 13/08/2017.
 */
public class CustomError {
    private String errorMessage;

    public CustomError(String errorMessage){
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    @Override
    public String toString() {
        return "CustomError{" +
                "errorMessage='" + errorMessage + '\'' +
                '}';
    }
}
