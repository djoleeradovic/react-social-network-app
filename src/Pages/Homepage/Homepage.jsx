import { React, useEffect } from "react";
import { Posts, Header } from "../../Components";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { checkForCookie } from "../../Helpers/Utils";

const Homepage = () => {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    checkForCookie(navigate, cookies.user);
  }, []);

  return (
    <>
      <Header />
      <Posts />
    </>
  );
};

export default Homepage;
