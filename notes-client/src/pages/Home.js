import React, { useContext } from "react";

import { useHistory } from "react-router";
import { userContext } from "../Routing";

export default function Home() {
  const { userData } = useContext(userContext);
  const history = useHistory();
  if (!userData.isLoggedIn) {
    history.push("/");
  }
  return (
    <>
      {userData.isLoggedIn && (
        <div>
          <h1>Welcome!</h1>
          <p>Token: {userData.user.token}</p>
        </div>
      )}
    </>
  );
}
