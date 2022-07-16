import { type } from "@testing-library/user-event/dist/type";
import { constants } from "buffer";
import React, { useEffect, useState } from "react";
import "./Acceull.css";
import { Tache } from "../interface/Task";
import TaskDiv from "../componant/TaskDiv";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

const Acceull = () => {
  const [actifValue, setActifValue] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [bodyValue, setBodyValue] = useState<string>("");
  const [stateValue, setStateValue] = useState<string>("to do");
  const [deletTodoTask, setDeletTodoTask] = useState<number | null>(null);
  const [deletDoingTask, setDeletDoingTask] = useState<number | null>(null);
  const [deletDonneTask, setDeletDonneTask] = useState<number | null>(null);
  const [actu, setActu] = useState<string>("TO DO");

  let forChageTask: Tache[];
  const [todoTask, setTodoTask] = useState<Tache[]>([]);
  const [doingTask, setDoingTask] = useState<Tache[]>([]);
  const [donneTask, setDonneTask] = useState<Tache[]>([]);

  const writeInput: () => void = () => {};

  const addTask: (e: React.FormEvent) => void = (e) => {
    if (actifValue && titleValue != "" && bodyValue != "") {
      e.preventDefault();
      if (deletTodoTask != null && stateValue === "to do") {
        forChageTask = todoTask;
        forChageTask[deletTodoTask] = {
          titre: titleValue,
          status: stateValue,
          body: bodyValue,
        };
        setTodoTask(forChageTask);
      } else if (deletDoingTask != null && stateValue === "doing") {
        forChageTask = doingTask;
        forChageTask[deletDoingTask] = {
          titre: titleValue,
          status: stateValue,
          body: bodyValue,
        };
        setDoingTask(forChageTask);
      } else if (deletDonneTask != null && stateValue === "donne") {
        forChageTask = donneTask;
        forChageTask[deletDonneTask] = {
          titre: titleValue,
          status: stateValue,
          body: bodyValue,
        };
        setDonneTask(forChageTask);
      } else {
        if (deletTodoTask != null) {
          forChageTask = todoTask;
          if (forChageTask.length == 1) {
            setTodoTask([]);
          } else if (forChageTask.length == 2) {
            if (deletTodoTask == 0) {
              setTodoTask([forChageTask[1]]);
            } else {
              setTodoTask([forChageTask[0]]);
            }
          } else {
            if (deletTodoTask == 0) {
              forChageTask.shift();
              setTodoTask(forChageTask);
            } else if (deletTodoTask == todoTask.length - 1) {
              forChageTask.pop();
              setTodoTask(forChageTask);
            } else {
              setTodoTask([
                ...todoTask.slice(0, deletTodoTask - 1),
                ...todoTask.slice(deletTodoTask),
              ]);
            }
          }
        } else if (deletDoingTask != null) {
          forChageTask = doingTask;
          if (forChageTask.length == 1) {
            setDoingTask([]);
          } else if (forChageTask.length == 2) {
            if (deletDoingTask == 0) {
              setDoingTask([forChageTask[1]]);
            } else {
              setDoingTask([forChageTask[0]]);
            }
          } else {
            if (deletDoingTask == 0) {                <select>
                <option
                  value="1"
                  onClick={() => {
                    setStateValue("to do");
                  }}
                >
                  To do
                </option>
                <option
                  value="2"
                  onClick={() => {
                    setStateValue("doing");
                  }}
                >
                  Doing
                </option>
                <option
                  value="3"
                  onClick={() => {
                    setStateValue("donne");
                  }}
                >
                  Donne
                </option>
              </select>
              forChageTask.shift();
              setDoingTask(forChageTask);
            } else if (deletDoingTask == doingTask.length - 1) {
              forChageTask.pop();
              setDoingTask(forChageTask);
            } else {
              setDoingTask([
                ...doingTask.slice(0, deletDoingTask - 1),
                ...doingTask.slice(deletDoingTask),
              ]);
            }
          }
        } else if (deletDonneTask != null) {
          forChageTask = donneTask;
          if (forChageTask.length == 1) {
            setDonneTask([]);
          } else if (forChageTask.length == 2) {
            if (deletDonneTask == 0) {
              setDonneTask([forChageTask[1]]);
            } else {
              setDonneTask([forChageTask[0]]);
            }
          } else {
            if (deletDonneTask == 0) {
              forChageTask.shift();
              setDonneTask(forChageTask);
            } else if (deletDonneTask == donneTask.length - 1) {
              forChageTask.pop();
              setDonneTask(forChageTask);
            } else {
              setDonneTask([
                ...donneTask.slice(0, deletDonneTask - 1),
                ...donneTask.slice(deletDonneTask),
              ]);
            }
          }
        }

        if (stateValue === "to do") {
          setTodoTask([
            { titre: titleValue, status: stateValue, body: bodyValue },
            ...todoTask,
          ]);
        } else if (stateValue === "doing") {
          setDoingTask([
            { titre: titleValue, status: stateValue, body: bodyValue },
            ...doingTask,
          ]);
        } else if (stateValue === "donne") {
          setDonneTask([
            { titre: titleValue, status: stateValue, body: bodyValue },
            ...donneTask,
          ]);
        }
      }

      setTitleValue("");
      setBodyValue("");
      setDeletTodoTask(null);
      setDeletDoingTask(null);
      setDeletDonneTask(null);
      setActifValue(false);
    } else {
      e.preventDefault();
    }
  };

  console.log(todoTask);

  return (
    <>
      <div className="container">
        <h1>TO DO LIST</h1>
        <div className="row">
          <form className="">
            <div className="">
              <div className="">
                <div className="">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                    <Form.Control
                      placeholder="ex. : Go for workout"
                      aria-label="Titre"
                      aria-describedby="basic-addon1"
                      value={titleValue}
                      onChange={(event) => {
                        setTitleValue(event.target.value);
                        setActifValue(true);
                      }}
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="">
                <InputGroup>
                  <InputGroup.Text>Description</InputGroup.Text>
                  <Form.Control
                    placeholder="Description"
                    as="textarea"
                    aria-label="With textarea"
                    value={bodyValue}
                    onChange={(event) => {
                      setBodyValue(event.target.value);
                      setActifValue(true);
                    }}
                  />
                </InputGroup>
              </div>
              <div className="">


        <SplitButton
            key='Secondary'
            id={`dropdown-split-variants-Secondary`}
            variant="Secondary"
            title="STATUS"
          >
            <Dropdown.Item eventKey="1"                     onClick={() => {
                      setStateValue("to do");
                      setActu("TO DO");
                    }} active>TO DO</Dropdown.Item>
            <Dropdown.Item                     onClick={() => {
                      setStateValue("doing");
                      setActu("DOING");
                    }} eventKey="2">DOING</Dropdown.Item>
            <Dropdown.Item                     onClick={() => {
                      setStateValue("donne");
                      setActu("DONNE");
                    }} eventKey="3" >DONE</Dropdown.Item>
        </SplitButton>
                
              </div>
              <div className="" style={{ margin:"2em" }}>
                <Button variant="secondary" onClick={addTask} type="submit">
                  ADD TO LIST
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12" style={{padding:"1em"}}>
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "#acacac" }}>
                TO DO
              </Card.Header>
              <ListGroup variant="flush">
                {todoTask.map((t) => (
                  <TaskDiv
                    setActu={setActu}
                    data={t}
                    idData={todoTask.indexOf(t)}
                    key={todoTask.indexOf(t)}
                    setTitleValue={setTitleValue}
                    setStateValue={setStateValue}
                    setBodyValue={setBodyValue}
                    setDeletTodoTask={setDeletTodoTask}
                    setDeletDoingTask={setDeletDoingTask}
                    setDeletDonneTask={setDeletDonneTask}
                    setActifValue={setActifValue}
                  />
                ))}
              </ListGroup>
            </Card>
          </div>
          <div className="col-md-4 col-sm-12" style={{padding:"1em"}}>
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "#acacac" }}>
                DOING
              </Card.Header>
              <ListGroup variant="flush">
                {doingTask.map((t) => (
                  <TaskDiv
                    setActu={setActu}
                    data={t}
                    idData={doingTask.indexOf(t)}
                    key={doingTask.indexOf(t)}
                    setTitleValue={setTitleValue}
                    setStateValue={setStateValue}
                    setBodyValue={setBodyValue}
                    setDeletTodoTask={setDeletTodoTask}
                    setDeletDoingTask={setDeletDoingTask}
                    setDeletDonneTask={setDeletDonneTask}
                    setActifValue={setActifValue}
                  />
                ))}
              </ListGroup>
            </Card>
          </div>
          <div className="col-md-4 col-sm-12" style={{padding:"1em"}}>
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "#acacac" }}>
                DONE
              </Card.Header>
              <ListGroup variant="flush">
                {donneTask.map((t) => (
                  <TaskDiv
                    setActu={setActu}
                    data={t}
                    idData={donneTask.indexOf(t)}
                    key={donneTask.indexOf(t)}
                    setTitleValue={setTitleValue}
                    setStateValue={setStateValue}
                    setBodyValue={setBodyValue}
                    setDeletTodoTask={setDeletTodoTask}
                    setDeletDoingTask={setDeletDoingTask}
                    setDeletDonneTask={setDeletDonneTask}
                    setActifValue={setActifValue}
                  />
                ))}
              </ListGroup>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acceull;
