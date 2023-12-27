import axios from 'axios';

const REGISTER_USER = 'REGISTER-USER';
const SET_TOKEN = 'SET-TOKEN';
const LOGIN_STUDENT = 'LOGIN-STUDENT'
const GET_UNIVERSITY = 'GET-UNIVERSITY'

const localStore = {
    userData: [],
    data: [],
    uniData: []
};

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const AuthReducers = ( state = localStore, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                data: action.data
            }
        
        case LOGIN_STUDENT:
            return {
                ...state,
                userData: action.userData,
                data:action.data
            }

        case GET_UNIVERSITY:
            return {
                ...state,
                uniData: action.data
            }

        default:
            return state
    }
}

const getUniversityAC = data => ({type: GET_UNIVERSITY, data})
const setTokenAC = data => ({type: SET_TOKEN, data: data});
const loginStudentAC = (data, userData) => ({type: LOGIN_STUDENT, userData: userData, data: data});


export const registerUserTC = data => async dispatch => {
        let dataForUser = {
            'email': data['email'],
            'username': data['username'],
            'password': data['password']
        }
        let response = await instance.post('auth/users/', dataForUser);
        setTimeout(async () => {
            let dataForStudent = {
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'year': data['year'],
                'major': data['major'],
                'birth_date': data['birth_date'],
                'user': response.data.id,
                'gender': data['gender'],
                'university': data['universityId'],
                'phone_number': data['phone'],
                'address': data['address']
            }
            let resp = await instance.post('create/student', dataForStudent)
            dispatch(loginStudentAC(resp.data, response.data))
        })
};

export const loginStudentTC = data => async dispatch => {
    let response = await instance.post('auth/token/', data)
    dispatch(setTokenAC(response.data.access))
    setTimeout(async () => {
        let headers = {'Authorization': `Bearer ${response.data.access}`}
        let getToken = await instance.get('auth/users/me/', {headers: headers})
        let getProfile = await instance.get(`create/student?user=${getToken.data.id}`)
        let getProfileData = await instance.get(`student/${getProfile.data[0].id}`)
        console.log(getProfileData.data);
        dispatch(loginStudentAC(getProfileData.data, getToken.data))
    })
}

export const getUniversityTC = () => async dispatch => {
    let response = await instance.get('create/university')
    dispatch(getUniversityAC(response.data))
}