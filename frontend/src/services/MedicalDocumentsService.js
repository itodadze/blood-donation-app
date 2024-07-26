import api from "../AxiosInstance";

export const uploadFile = ({formData, filename, userId}) => {
    api.post('/documents/' + userId + "/upload/", formData, {headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Disposition': 'attachment; filename=' + filename,
            'filename': filename
        }}).then(response => response.data)
        .catch(error => console.log("Could not upload document", error));
}