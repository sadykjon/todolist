import instance from "./settings";

const registerServices = (data) => {
    console.log("registerServices>>>",data);
    return instance.post('users/register',data)
}

const loginServices = (data) => {
    return instance.post('users/login', data)
}

const getMe = () => {
  return instance.get('users/me')
}

export const authServices = {
    registerServices,
    loginServices,
    getMe
}