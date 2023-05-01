import http from "./httpService";
//import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
http.setJwt(getJwt());

async function login(email, password) {
  // const {data : jwt} = await http.post(config.apiEndpoint + '/auth', {
  //   email,
  //   password
  // });
  const {data : jwt} = await http.post('/auth', {
    email,
    password
  });
  localStorage.setItem(tokenKey,jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey,jwt);
}

function logout(){
  localStorage.removeItem(tokenKey);
}

function getCurrentUser(){
  try{
    return jwtDecode(localStorage.getItem(tokenKey));
  }
  catch(ex){
    return null;
  }
}

function getJwt(){
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
}

