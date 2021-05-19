import {
  _getQuestions,
  _getUsers,
  _saveQuestionAnswer,
  _saveQuestion,
} from "../../utils/_DATA";
// import { setAuthedUser } from "./authedUser";
import { recieveQuestions } from "./questions";
import { recieveUsers } from "./users";

export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(obj, uid) {
  return {
    type: ADD_QUESTION,
    question: { ...obj },
    uid,
  };
}

function addAnswer(uid, qid, answer) {
  return {
    type: ADD_ANSWER,
    uid,
    qid,
    answer,
  };
}

// export function getInitialData(authedUser) {
//   return (dispatch) => {
//     Promise.all([_getUsers(), _getQuestions()]).then(([]) => {
//       dispatch(setAuthedUser(authedUser));
//     });
//   };
// }

export function handleInitialData() {
  return (dispatch) => {
    Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
      dispatch(recieveUsers(users));
      dispatch(recieveQuestions(questions));
    });
  };
}

export function saveAnswer(uid, qid, answer) {
  return (dispatch) => {
    _saveQuestionAnswer({
      authedUser: uid,
      qid,
      answer,
    }).then((res) => {
      dispatch(addAnswer(uid, qid, answer));
    });
  };
}

export function saveQuestion(obj) {
  return (dispatch) => {
    _saveQuestion(obj).then((res) => {
      dispatch(addQuestion(res, obj.author));
    });
  };
}
