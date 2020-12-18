import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const CuseAuth = () => {
  const [Ctoken, setCtoken] = useState(false);
  const [CtokenExpirationDate, setCtokenExpirationDate] = useState();
  const [Condidatid, setCondidatid] = useState(false);

  const login = useCallback((uid, Ctoken, expirationDate) => {
    setCtoken(Ctoken);
    setCondidatid(uid);
    const CtokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setCtokenExpirationDate(CtokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        Condidatid: uid,
        Ctoken: Ctoken,
        expiration: CtokenExpirationDate.toISOString()
      })
    );
    
  }, []);

  const logout = useCallback(() => {
    setCtoken(null);
    setCtokenExpirationDate(null);
    setCondidatid(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (Ctoken && CtokenExpirationDate) {
      const remainingTime = CtokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [Ctoken, logout, CtokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.Ctoken &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.Condidatid, storedData.Ctoken, new Date(storedData.expiration));
    }
  }, [login]);

  return { Ctoken, login, logout, Condidatid };
};