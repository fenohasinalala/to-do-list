import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Tache } from "../interface/Task";
import "./TaskDiv.css";

interface props {
  data: Tache;
  idData: number;
  setTitleValue: (value: React.SetStateAction<string>) => void;
  setStateValue: (value: React.SetStateAction<string>) => void;
  setBodyValue: (value: React.SetStateAction<string>) => void;
  setDeletTodoTask: React.Dispatch<React.SetStateAction<number | null>>;
  setDeletDoingTask: React.Dispatch<React.SetStateAction<number | null>>;
  setDeletDonneTask: React.Dispatch<React.SetStateAction<number | null>>;
  setActifValue: React.Dispatch<React.SetStateAction<boolean>>;
  setActu:React.Dispatch<React.SetStateAction<string>>;
}

const TaskDiv: React.FC<props> = ({
    setActu,
  data,
  idData,
  setTitleValue,
  setStateValue,
  setBodyValue,
  setDeletTodoTask,
  setDeletDoingTask,
  setDeletDonneTask,
  setActifValue,
}: props) => {
  const writTask: () => void = () => {
    setActifValue(true);
    setTitleValue(data.titre);
    setStateValue(data.status);
    setBodyValue(data.body);
    if (data.status == "to do") {
      setDeletTodoTask(idData);
      setDeletDoingTask(null);
      setDeletDonneTask(null);
      setActu("TO DO");
    } else if (data.status == "doing") {
      setDeletTodoTask(null);
      setDeletDoingTask(idData);
      setDeletDonneTask(null);
      setActu("DOING");
    
    } else if (data.status == "donne") {
      setDeletTodoTask(null);
      setDeletDoingTask(null);
      setDeletDonneTask(idData);
      setActu("DONE");
    }
  };

  return (
    <div key={idData} className="card-body" onClick={writTask}>
      <div className="media-body text-right" style={{ backgroundColor:"#ececec" , borderRadius:".4em", padding:"5px"}}>
        <h3>{data.titre}</h3>
        <span>{data.body}</span>
      </div>
    </div>
  );
};

export default TaskDiv;
