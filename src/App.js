import React, { useState, useCallback } from "react";
import Navmenu from './component/nav';
import Home from './component/home';
import LoginE from './component/admin/loginregister'
import Ajoutformation from './component/admin/ajoutformation'
import Dformation from './component/detailleformations'
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { Authcontext } from './component/context/auth-context';
import { CuseAuth } from './component/hooks/auth-hooks';
import {EuseAuth} from './component/hooks/authE-hooks'




export default function App() {

  const { Ctoken, login, logout, Condidatid } = CuseAuth();
  const { Etoken, Elogin, Elogout, Entrepriseid  } = EuseAuth()




  let routes;
  if (Ctoken) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/Dformation/:fid" component={Dformation}/>

      


        

      </React.Fragment>)
  } else if (Etoken) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/Dformation/:fid" component={Dformation}/>
        <Route path="/entreprise/ajouter-annonce" component={Ajoutformation}/>
        

      </React.Fragment>)

  }
  else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/Dformation/:fid" component={Dformation}/>
        <Route path="/entrepriselogin" component={LoginE} />
        
    
        

      </React.Fragment>
    )
  }


  return (
    <div>
      <Authcontext.Provider value={{
        isLoggedIn: !!Ctoken,
        condidatId: Condidatid,
        Ctoken: Ctoken,
        login: login,
        logout: logout,
        isentrprise: !!Etoken,
        Etoken: Etoken,
        userId: Entrepriseid,
        loginentreprise: Elogin,
        Elogout:Elogout
      
      }}>
        <BrowserRouter>
          <Navmenu></Navmenu>


          {routes}
          


        </BrowserRouter>
      </Authcontext.Provider>

    </div>
  )

}