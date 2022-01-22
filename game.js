const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: `<meta name="viewport" content="width=device-width, initial-scale=1.0"> \n \n Quyidagi kodda ishlatilgan atribut nomini toping`,
        choice1: 'name',
        choice2: 'meta',
        choice3: 'name, content',
        choice4: 'viewport',
        answer: 3,
    },
    {
        question: "Tartiblangan ro'yxat tuzish sintaksisi to'g'ri ko'rsatilgan qatorni topoing",
        choice1: `<li> \n   <ol></ol> \n <ol></ol> \n</li>`,
        choice2: `<li> \n   <ul></ul> \n <ul></ul> \n</li>`,
        choice3: `<ul> \n   <li></li> \n <li></li> \n</ul>`,
        choice4: `<ol> \n   <li></li> \n <li></li> \n</ol>`,
        answer: 4,
    },
    {
        question: `<table> </table> tagidan keyin kelishi majburiy taglar qaysi`,
        choice1: `<tr> </tr> va <th> </th>`,
        choice2: `<thead> </thead> va <tbody> </tbody>`,
        choice3: `<tr> </tr> va <td> </td>`,
        choice4: `majburiy taglar yo'q`,
        answer: 2,
    },
    {
        question: `<video> </video> va <audio> </audio> taglari ishlashi uchun qo'shiladigan atribut bu - `,
        choice1: `autoplay`,
        choice2: `controls`,
        choice3: `required`,
        choice4: `iframe`,
        answer: 2,
    },
    {
        question: `Formalarda ma'lumotni jo'natish uchun qaysi tipdagi button qo'yilishi kerak? `,
        choice1: `<button type="reset">Jo'natish</button>`,
        choice2: `<button type="submit">Jo'natish</button>`,
        choice3: `<button type="text">Jo'natish</button>`,
        choice4: `<button type="file">Jo'natish</button>`,
        answer: 2,
    },
    {
        question: `<a> </a> tagidagi tagchiziqni olib tashlash uchun nimadan foyladalaniladi?`,
        choice1: `list-style: none`,
        choice2: `text-underline: none;`,
        choice3: `text-transform: none;`,
        choice4: `text-decoration: none;`,
        answer: 4,
    },
    {
        question: ` "line-height:20px" ning vazifasi nima? `,
        choice1: `so'zlar orasidagi masofa 20px ga o'zgaradi`,
        choice2: `qatorlar orasidagi masofa 20px ga o'zgaradi`,
        choice3: `harflar orasidagi masofa 20px ga o'zgaradi`,
        choice4: `yozuv qalinligi 20px ga o'zgaradi`,
        answer: 2,
    },
    {
        question: ` ... - vazifasi matn (text)ni markazga olib keladi`,
        choice1: `align-item: center`,
        choice2: `justify-content: center`,
        choice3: `text-align: center`,
        choice4: `align-content: center`,
        answer: 3,
    },
    {
        question: `Blockga ramka berish uchun ishlatiladigan tag`,
        choice1: `box-shadow`,
        choice2: `border`,
        choice3: `border-radius`,
        choice4: `solid`,
        answer: 2,
    },
    {
        question: ` Blockga soya berish uchun nimadan foydalaniladi? `,
        choice1: `box-shadow`,
        choice2: `border`,
        choice3: `border-radius`,
        choice4: `solid`,
        answer: 1,
    },
    {
        question: `Block elementlarini ustun shaklida( y o'qi bo'ylab vertical) joylashtirish uchun nima ishlatilinadi?  `,
        choice1: `display: flex`,
        choice2: `flex-wrap: wrap`,
        choice3: `flex-direction:column`,
        choice4: `flex-direction:row`,
        answer: 3,
    },
    {
        question: `Blockga sig'magan elementlarni pastga tushirib yurborish uchun nima ishlatilinadi>`,
        choice1: `display: flex`,
        choice2: `flex-wrap: wrap`,
        choice3: `flex-direction:column`,
        choice4: `flex-direction:row`,
        answer: 2,
    },
    {
        question: `Elementni tartibini aniqlab beruvchi tag bu - `,
        choice1: `position`,
        choice2: `order`,
        choice3: `transform`,
        choice4: `translate`,
        answer: 2,
    },
    {
        question: `Biror elementni istalgan nuqtaga surish uchun qaysi tag ishlatiladi?`,
        choice1: `positon: releative`,
        choice2: `position: absolute`,
        choice3: `display: flex`,
        choice4: `display: inline-block`,
        answer: 2,
    },
    {
        question: `after tagi to'gri qo'llanilgan qatorni belgilang`,
        choice1: `element:after{ \n . . . \n}`,
        choice2: `element::after{ \n . . . \n}`,
        choice3: `element:after{ \n content: '' \n . . . \n}`,
        choice4: `element::after{ \n content: '' \n . . . \n}`,
        answer: 2,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Savol ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()