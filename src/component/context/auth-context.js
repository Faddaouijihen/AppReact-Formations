import {createContext} from 'react';

export const Authcontext = createContext({
    isentrprise:false,
    isLoggedIn:false,
    userId:null,
    condidatId:null,
    Ctoken:null,
    Etoken:null,
    login:()=>{},
    logout:()=>{},
    Elogout:()=>{},
    loginentreprise:()=>{},
 
});