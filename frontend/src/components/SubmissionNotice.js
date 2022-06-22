import React, { useContext } from "react";
import { Alert } from "react-bootstrap";

import { Context } from "../Context";

const SubmissionNotice = () => {
  const { user } = useContext(Context);

  return (
    <>
      {user.project_id === null && (
        <Alert className="m-3" variant="info">
          Please submit a project! Only one submission per team is required.
          Everyone on your team must have an account.
        </Alert>
      )}
      {user.project_id !== null && (
        <Alert className="m-3" variant="warning">
          Ensure you press save if you change anything! Only one submission per
          team is required. Everyone on your team must have an account.
        </Alert>
      )}
    </>
  );
};

export default SubmissionNotice;
