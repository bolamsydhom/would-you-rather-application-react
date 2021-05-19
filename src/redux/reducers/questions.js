import { RECIEVE_QUESTIONS } from '../actions/questions';
import { ADD_ANSWER, ADD_QUESTION } from '../actions/shared';

export function questions(state = {}, action) {
    switch (action.type) {
        case RECIEVE_QUESTIONS:
            return action.questions;
        case ADD_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer]['votes'].concat([action.uid])
                    }
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: {
                    ...action.question
                }
            }
        default:
            return state;
    }
}