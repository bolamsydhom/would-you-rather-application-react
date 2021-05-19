export const RECIEVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function recieveQuestions(questions) {
    return {
        type: RECIEVE_QUESTIONS,
        questions,
    };
}
