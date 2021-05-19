import { RECIEVE_USERS } from '../actions/users';
import { ADD_ANSWER, ADD_QUESTION } from '../actions/shared';

export function users(state = {}, action) {
    switch (action.type) {
        case RECIEVE_USERS:
            return action.users;
        case ADD_ANSWER:
            return {
                ...state,
                [action.uid]: {
                    ...state[action.uid],
                    answers: {
                        ...state[action.uid]['answers'],
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.uid]: {
                    ...state[action.uid],
                    questions: state[action.uid]['questions'].concat([action.question.id])
                }
            }
        default:
            return state;
    }
}