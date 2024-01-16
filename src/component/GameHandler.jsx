
import React, { useState } from 'react';
import DataModel from "../model/DataModel";
import {szenvedoMondatok} from "../model/angol";
import Form from "../component/form/Form";

const model = new DataModel(szenvedoMondatok);
let questionIndex = 0;

export default function GameHandler() {

    const [actualQuestion, setQuestion] = useState(model.getQuestion(questionIndex));
    const [points, setPoint] = useState(0);

    function nextQuestion(tryCount) {
        if (questionIndex >= model.getQuestionCount() - 1) {
            return;
        }
        
        if (tryCount == 1) {
            setPoint(points + 1);
        }
        ++questionIndex;
        setQuestion(model.getQuestion(questionIndex));
    }

    return (
        <div>
            {
                model.getTitle()
            }
            <Form question={actualQuestion} correctAnswerSubmitFn={nextQuestion} />
            Pontok: {points}
        </div>
    )
}