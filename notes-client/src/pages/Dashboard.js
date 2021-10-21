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
  const { userData } = useContext(userContext);
  const history = useHistory();
  const [notes, setNotes] = useState({
    status: "loading",
    data: [],
    error: null,
  });

  useEffect(() => {
    if (!userData.isLoggedIn) {
      return history.push("/");
    }
    getNotes();
  }, []);

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
    <div>
      <div>
        <img src={logo} />
      </div>
      <div>
        {notes.status !== "loading" ? (
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              padding: "1em",
            }}
          >
            {notes.data.map((note) => (
              <div
                style={{
                  backgroundColor: "lightgray",
                  padding: "1em",
                  borderRadius: "0.7em",
                }}
              >
                <p>ID: {note.id}</p>
                <button
                  onClick={() => {
                    history.push(`/editor/${note.id}`);
                  }}
                  style={{ cursor: "pointer" }}
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
            Get organised with your first Kanganote today by adding new notes!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
