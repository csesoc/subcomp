import React from "react";
import { Alert } from "react-bootstrap";

const SubmissionNotice = () => {
  const { user } = useContext(Context);

  return (
    <>
      {user.project === null && (
        <Alert className="m-3" variant="info">
          Please submit a project! Only one submission per team is required.
          Everyone on your team must have an account.
        </Alert>
      )}
      {user.project !== null && (
        <Alert className="m-3" variant="warning">
          Ensure you press save if you change anything! Only one submission per
          team is required. Everyone on your team must have an account.
        </Alert>
      )}
    </>
  );
};

export default SubmissionNotice;
