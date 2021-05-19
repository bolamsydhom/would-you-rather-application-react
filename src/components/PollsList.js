import React from 'react';
import PollCard from './PollCard'

class PollsList extends React.Component {

    render() {
        const {questions} = this.props;
        return (
            <ul className="poll-cards-list">
                {
                    questions.map(qid => (
                        <li key={qid} className="poll-card"><PollCard qid={qid} /></li>))
                }
            </ul>
        );
    }
}

export default PollsList;