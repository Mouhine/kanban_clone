import React, { useEffect } from "react";
import Modale from "./modals/Modale";
import { useHandleRefreshMutation } from "@/redux/api/auth";
import { setAuth } from "@/redux/Futures/authSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { id, accessToken } = useSelector(
    (state: RootState) => state.credentials
  );
  const dispatch = useDispatch();
  const [refresh, result] = useHandleRefreshMutation();

  async function name() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/refresh", {
        method: "POST",
      });
      const data = await res.json();
      dispatch(setAuth(data));
      console.log(accessToken);
    } catch (error) {}
  }

  useEffect(() => {
    name();
  }, []);

  return (
    <div>
      <Modale />
      {children}
    </div>
  );
};

export default Layout;
