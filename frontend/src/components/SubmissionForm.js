import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

import { Context } from "../Context";
import ProjectCard from "./ProjectCard";
import DeleteProject from "./DeleteProject";
import { callSubmitProject, callEditProject, callCheckZID } from "../calls";

const SubmissionForm = () => {
  const { projects, setProjects, user, setUser } = useContext(Context);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");
  const [zIDs, setZIDs] = useState([user.zIDs]);
  const [fullNames, setFullNames] = useState([user.fullName]);
  const [firstYear, setFirstYear] = useState(false);
  const [postgrad, setPostgrad] = useState(false);
  const [addZID, setAddZID] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);

  useEffect(() => {
    if (user.projectId !== null) {
      const project = projects.filter(
        (project) => project.id === user.projectId
      )[0];
      setTitle(project.title);
      setSummary(project.summary);
      setLink(project.link);
      setRepo(project.repo);
      setZIDs(project.zIDs);
      setFullNames(project.fullNames);
      setFirstYear(false);
      setPostgrad(false);
      setAddZID("");
      setDeleteShow(false);
    }
  }, [projects, user]);

  const submit = () => {
    callSubmitProject(title, summary, link, repo, firstYear, postgrad, zIDs)
      .then((response) => {
        setProjects(
          projects.concat(response.data.project).sort((a, b) => a.id > b.id)
        );
        setUser({
          zID: user.zID,
          fullName: user.zIDs,
          votes: user.votes,
          projectId: response.data.project.id,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const edit = () => {
    callEditProject(title, summary, link, repo, firstYear, postgrad, zIDs)
      .then((response) => {
        setProjects(
          projects
            .filter((project) => project.id !== user.projectId)
            .concat(response.data.project)
            .sort((a, b) => a.id > b.id)
        );
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const deleteOpen = () => {
    setDeleteShow(true);
  };

  const deleteClose = () => {
    setDeleteShow(false);
  };

  const addTeamMember = () => {
    if (zIDs.length >= 3) {
      return;
    }
    callCheckZID(addZID)
      .then((response) => {
        if (user !== null) {
          setZIDs(zIDs.concat(response.data.zID));
          setFullNames(fullNames.concat(response.data.fullName));
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const deleteTeamMember = (oldFullName) => {
    const index = fullNames.indexOf(oldFullName);
    if (index !== -1) {
      setZIDs(zIDs.splice(index, 1));
      setFullNames(fullNames.filter((fullName) => fullName !== oldFullName));
    }
  };

  const deleteReset = () => {
    setTitle("");
    setSummary("");
    setLink("");
    setRepo("");
    setZIDs([user.zID]);
    setFullNames([user.fullName]);
    setFirstYear(false);
    setPostgrad(false);
    setAddZID("");
    setDeleteShow(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form style={{ width: "50%" }}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            placeholder="A Cool Project"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formSummary">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            value={summary}
            as="textarea"
            rows="5"
            placeholder="Something very, very interesting..."
            onChange={(event) => {
              setSummary(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formLink">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            value={link}
            placeholder="https://www.rust-lang.org/"
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formRepo">
          <Form.Label>Repo</Form.Label>
          <Form.Control
            type="text"
            value={repo}
            placeholder="https://github.com/rust-lang/rust"
            onChange={(event) => {
              setRepo(event.target.value);
            }}
          />
          <p className="mt-3">
            These questions determine if your project can be considered for the
            First Year's Prize or the Postgraduate Prize. They will be verified.
          </p>
          <Form.Check
            className="mt-3"
            type="checkbox"
            label="Did all team members commence as Undergraduate students in 2022?"
            onChange={(event) => {
              setFirstYear(event.target.value === "on");
            }}
          />
          <Form.Check
            className="mt-3"
            type="checkbox"
            label="Are all team members enrolled as Postgraduate students?"
            onChange={(event) => {
              setPostgrad(event.target.value === "on");
            }}
          />
        </Form.Group>
        <div className="my-3">
          <label>Add team members:</label>
          <InputGroup>
            <FormControl
              id="text"
              placeholder="zID"
              onChange={(event) => {
                setAddZID(event.target.value);
              }}
            />
            <InputGroup.Append>
              <Button
                variant="outline-success"
                onClick={addTeamMember}
                disabled={addZID.length !== 8 || zIDs.length >= 3}
              >
                add
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <h5
          className="mt-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Current Team:
        </h5>
        <div className="mt-4">
          {fullNames.map((fullName, index) => (
            <InputGroup key={index} className="mb-3">
              <InputGroup.Text>{fullName}</InputGroup.Text>
              <InputGroup.Append>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteTeamMember(fullName)}
                  disabled={zIDs[index] === user.zID}
                >
                  delete
                </Button>
              </InputGroup.Append>
            </InputGroup>
          ))}
        </div>
        <div className="mt-4">
          {user.projectId === null && (
            <Button
              variant="success"
              onClick={submit}
              disabled={
                title.length === 0 ||
                summary.length === 0 ||
                link.length === 0 ||
                repo.length === 0
              }
            >
              Submit
            </Button>
          )}
          {user.projectId !== null && (
            <div className="mb-3">
              <Button className="mx-2" variant="success" onClick={edit}>
                Save
              </Button>
              <Button className="mx-2" variant="danger" onClick={deleteOpen}>
                Delete
              </Button>
              <DeleteProject
                show={deleteShow}
                handleClose={deleteClose}
                reset={deleteReset}
              />
            </div>
          )}
        </div>
      </Form>
      <div>
        <h3 style={{ display: "flex", justifyContent: "center" }}>Preview</h3>
        <ProjectCard
          project={{
            id: 0,
            title: title,
            summary: summary,
            link: link,
            repo: repo,
            zIDs: zIDs,
            votes: 0,
          }}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default SubmissionForm;
