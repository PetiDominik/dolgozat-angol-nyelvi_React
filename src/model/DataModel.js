
export default class Model {
    #datas;
    #questions;
    
    constructor(datas) {
        this.#datas = [];
        this.#questions = [];

        datas.forEach(e => {
            switch (typeof e) {
                case "string":
                    this.#datas.push(e);
                    break;
                case "object":

                    this.#questions.push({
                        hun: e.magyar,
                        sentence: e.mondat,
                        default: e.alap,
                        correctAnswer: e.valasztas[0],
                        options: this.#randomizeAnswers(e.valasztas),
                    });
                    break;
                default:
                    break;
            }
        });
        this.#datas = datas;
    }

    getQuestion(index) {
        return this.#questions[index];
    }

    getQuestionCount() {
        return this.#questions.length;
    }

    getTitle() {
        return this.#datas[0];
    }

    #randomizeAnswers(answers) {
        let newAnswers = [...answers];
        let len = newAnswers.length;

        for (let i = 0; i < newAnswers.length; i++) {

            let j = this.#getRandomInt(len - 1);
            let cs = newAnswers[i];
            newAnswers[i] = newAnswers[j];
            newAnswers[j] = cs;

        }
        return newAnswers;
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}