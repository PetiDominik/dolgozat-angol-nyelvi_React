import "./Form.css";

import Button from "../button/Button";
import React, { useState } from "react";

let tryCount = 0;
let timeout = null;
let hint = "";

export default function Form(props) {
    let questionDatas = props.question;
    const [isAnswerCorrect, setAnswerCorrect] = useState(false);
    const [answerText, setAnswerText] = useState(" ");

    function checkAnswerIsCorrect(answer) {
        if (++tryCount > 1) {
            buildHint();
        }

        if (answer === questionDatas.correctAnswer) {
            setAnswerCorrect(true);
            setAnswerText(" ");
        } else {
            setAnswerCorrect(false);
            setAnswerText("helytelen" + (hint === "" ? "" : ` (${hint})`));
        }
    }

    function nextQuestion() {
        document.getElementById("inputt").value="";
        setAnswerCorrect(false);
        hint = "";
        props.correctAnswerSubmitFn(tryCount);
        tryCount = 0;
    }

    function changeFn(element) {
        setAnswerText((hint === "" ? "" : ` (${hint})`));

        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }

        if (element.target.value != "") {
            timeout = setTimeout(() => {
                checkAnswerIsCorrect(element.target.value);
            }, 750);
        }
    }

    function buildHint() {
        if (hint == "") {
            for (let i = 0; i < questionDatas.correctAnswer.length; i++) {
                if (questionDatas.correctAnswer[i] == " " || questionDatas.correctAnswer[i] == "'") {
                    hint += questionDatas.correctAnswer[i];
                } else {
                    hint += "_";
                }
            }
        }

        if (hint.indexOf("_") != -1) {
            let indexes = [], i = -1;
            while ((i = hint.indexOf("_", i+1)) != -1){
                indexes.push(i);
            }

            console.log(Math.floor(Math.random() * indexes.length));
            let hintIndex = indexes[Math.floor(Math.random() * indexes.length)];
            hint = replaceChar(hint, hintIndex, questionDatas.correctAnswer[hintIndex]);
            console.log(indexes, hintIndex, questionDatas.correctAnswer[hintIndex]);
        }
    }

    function replaceChar(text, index, value) {
        return text.slice(0, index) + value + text.slice(index + 1)
    }

    let splitText = questionDatas.sentence.split("_");

    return (
        <div>
            {<p>{splitText[0]}{<input id="inputt" type="text" onChange={changeFn}/>}{splitText[1]} ({questionDatas.default}) <br /> {answerText}</p>}
            {<Button onSubmit={nextQuestion} visible={isAnswerCorrect}/>}
            {console.log(questionDatas.correctAnswer)}
        </div>
    )
}