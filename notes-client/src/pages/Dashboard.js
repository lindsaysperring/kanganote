import "./Dashboard.css";

import React, { useContext, useEffect, useState } from "react";
import { axiosCatch, baseURL, getAuthHeader } from "../utils/config";

import { Icon } from "react-icons-kit";
import axios from "axios";
import logo from "../images/Logo.png";
import { plus } from "react-icons-kit/metrize/plus";
import { useHistory } from "react-router";
import { userContext } from "../Routing";

const Dashboard = () => {
  /**
   * Gets user data from react context, accessible from any component in routing
   */
  const { userData } = useContext(userContext);
  const history = useHistory();
  const [notes, setNotes] = useState({
    status: "loading",
    data: [],
    error: null,
  });

  /**
   * Redirects user to landing page if not logged in
   */
  useEffect(() => {
    if (!userData.isLoggedIn) {
      return history.push("/");
    }
    getNotes();
  }, []);

  /**
   * Generates Authentication header for axios with user token
   */
  const authHeader = getAuthHeader(userData);

  const newNote = () => {
    axios
      .get(`${baseURL}/api/notes/new`, authHeader)
      .then((res) => {
        if (res) {
          history.push(`/editor/${res.data.id}`);
        }
      })
      .catch((error) => {
        alert(axiosCatch(error));
      });
  };

  const getNotes = async () => {
    setNotes({ ...notes, status: "loading", error: null });
    axios
      .get(`${baseURL}/api/notes`, authHeader)
      .then((res) => {
        if (res) {
          setNotes({ ...notes, status: "idle", data: res.data });
        } else {
          setNotes({ ...notes, error: "Something went wrong" });
        }
      })
      .catch((error) => {
        setNotes({ ...notes, error: axiosCatch(error) });
      });
  };

  return (
    <>
      {userData.isLoggedIn && (
        <div>
          <div>
            <img src={logo} />
          </div>
          <div>
            {/**
             * Example of how to get username and email
             */}
            <h2>Welcome {userData.user.name}</h2>
            <p>Email {userData.user.email}</p>
            {notes.status !== "loading" ? (
              <div className="note-layout">
                {notes.data.map((note) => (
                  <div className="note-item">
                    <p>ID: {note.id}</p>
                    <button
                      className="note-edit-button"
                      onClick={() => {
                        history.push(`/editor/${note.id}`);
                      }}
                    >
                      Edit note
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading</p>
            )}
            <button
              id="newnotesbutton"
              onClick={newNote}
              style={{ cursor: "pointer" }}
            >
              <Icon size={25} icon={plus} /> New Notes
            </button>
            <div id="dashboardmessage">
              <p>
                Get organised with your first Kanganote today by adding new
                notes!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
