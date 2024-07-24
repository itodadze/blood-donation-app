import api from "../AxiosInstance"

export const register = async (firstName, lastName, email, password, passwordConfirm, date, lat, lon, blood, donor) => {
    const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirm: passwordConfirm,
        birthday: date,
        loc_latitude: lat,
        loc_longitude: lon,
        blood_type: blood,
        donor_status: donor
    };

    try {
        const response = await api.post('/register/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating a user:', error);
        throw error;
    }
}

export const login = async (email, password) => {
    const data = {
        email: email,
        password: password
    };

    try {
        const response = await api.post('/login/', data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error signing a user:', error);
        throw error;
    }
}

export const existsUser = (email) => {

}