import api from "../AxiosInstance"

export const tryConfirmEmail = ({uid, token}) => {
    return api.get('/confirm-email/' + uid + '/' + token + '/')
        .then((response) => response.data)
        .catch((error) => console.error("Error confirming email", error));
}