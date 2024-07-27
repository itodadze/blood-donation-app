import api from "../AxiosInstance";

export const saveFile = ({formData, userId, file}) => {
    return api.post('/documents/' + userId + "/upload/", formData, {headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Disposition': `attachment; filename=${file.name}`,
        }}).then(response => response.data)
        .catch(error => console.log("Could not upload document", error));
}

export const getMedicalDocuments = ({userId}) => {
    return api.get('/documents/', {params: {id: userId}})
        .then(response => response.data)
        .catch(error => console.log("Could not get medical documents for user", error));
}

export const getMedicalDocument = ({id}) => {
    return api.get('/documents/access/', {params: {id: id}, responseType: 'blob'})
        .then(response => response)
        .catch(error => console.log("Could not access medical document", error));
}

export const deleteMedicalDocument = ({id}) => {
    return api.delete('/documents/access/', {params: {id: id}})
        .then(response => response.data)
        .catch(error => console.log("Could not delete document", error))
}