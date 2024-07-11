import api from "../AxiosInstance"
export const register = (firstName, lastName, email, password, passwordConfirm, date,
                         lat, lon, blood, donor) => {
    const data = {
        first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            birthday: date,
            loc_latitude: lat,
            loc_longitude: lon,
            blood_type: blood,
            donor_status: donor
    };

    return api.post('/register/', data)
        .then(response => response.data)
        .catch(error => console.error('Error creating a user:', error));
}

export const login = (email, password) => {

}

export const existsUser = (email) => {

}