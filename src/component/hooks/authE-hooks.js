import { useState, useCallback, useEffect } from 'react';

let ElogoutTimer;

export const EuseAuth = () => {
  const [Etoken, setEtoken] = useState(false);
  const [EtokenExpirationDate, setEtokenExpirationDate] = useState();
  const [Entrepriseid, setEntrepriseid] = useState(false);
  

  const Elogin = useCallback((uid, Etoken, expirationDate) => {
    setEtoken(Etoken);
    setEntrepriseid(uid);
  
    const EtokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setEtokenExpirationDate(EtokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        Entrepriseid: uid,
        Etoken: Etoken,
    
        expiration: EtokenExpirationDate.toISOString()
        
      })
    );
  }, []);

  const Elogout = useCallback(() => {
    setEtoken(null);
    setEtokenExpirationDate(null);
    setEntrepriseid(null);
   
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (Etoken && EtokenExpirationDate) {
      const remainingTime = EtokenExpirationDate.getTime() - new Date().getTime();
      ElogoutTimer = setTimeout(Elogout, remainingTime);
    } else {
      clearTimeout(ElogoutTimer);
    }
  }, [Etoken, Elogout, EtokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.Etoken &&
     
      new Date(storedData.expiration) > new Date()
    ) {
      Elogin(storedData.Entrepriseid, storedData.Etoken, new Date(storedData.expiration));
    }
  }, [Elogin]);

  return { Etoken, Elogin, Elogout, Entrepriseid};
};