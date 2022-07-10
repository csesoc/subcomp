import React, { createContext, useState } from "react";

export const Context = createContext({
  projects: [],
  setProjects: () => {},
  webProjects: [],
  setWebProjects: () => {},
  mobileProjects: [],
  setMobileProjects: () => {},
  otherProjects: [],
  setOtherProjects: () => {},
  user: null,
  setUser: () => {},
  projectDeadline: null,
  setProjectDeadline: () => {},
  voteDeadline: null,
  setVoteDeadline: () => {},
  waiting: null,
  setWaiting: () => {},
});

const ContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [webProjects, setWebProjects] = useState([]);
  const [mobileProjects, setMobileProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [projectDeadline, setProjectDeadline] = useState(null);
  const [voteDeadline, setVoteDeadline] = useState(null);
  const [waiting, setWaiting] = useState(true);

  const initialContext = {
    projects,
    setProjects,
    webProjects,
    setWebProjects,
    mobileProjects,
    setMobileProjects,
    otherProjects,
    setOtherProjects,
    user,
    setUser,
    projectDeadline,
    setProjectDeadline,
    voteDeadline,
    setVoteDeadline,
    waiting,
    setWaiting,
  };

  return <Context.Provider value={initialContext}>{children}</Context.Provider>;
};

export default ContextProvider;
