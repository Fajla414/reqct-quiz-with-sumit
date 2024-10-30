import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestion";
import Answers from "../Answers";
import Miniplayer from "../Miniplayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

const Quiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currenQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currenQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  // handle when user click the prev button get the bact to the previous question
  const prevQuestion = () => {
    if (currenQuestion >= 1 && currenQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  };

  // handle when user click the next button get the next question
  const nextQuestion = () => {
    if (currenQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  };

  const submit = async () => {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    navigate({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  };

  // calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currenQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading....</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currenQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currenQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={percentage}
          />
          <Miniplayer id={id} title={qna[currenQuestion].title} />
        </>
      )}
    </>
  );
};

export default Quiz;
