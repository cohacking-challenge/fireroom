import db from 'backend/db';

function createTemplateWithSession(nbOfQuestions = 10) {
  const templateId = 'generated-' + Date.now();

  // Generate one template in "templates/:templateId"
  db
    .collection('templates')
    .doc(templateId)
    .set({
      name: 'Generated Template from scripts',
      ownerUid: 'aKGJS8UlE4VsREfP3HcKQlvSMnb2', // maxence@ironhack.com
      pages: Array(nbOfQuestions)
        .fill()
        .map((x, i) => ({
          questionRef: db
            .collection('templates')
            .doc(templateId)
            .collection('questions')
            .doc(`generated-question-${i}`),
          type: 'QUESTION',
        })),
    })
    .then(docRef => {})
    .catch(error => {
      throw new Error('Error adding document: ', error);
    });

  // Generate one session in "templates/:templateId/sessions/generated-session-0"
  let responses = {};
  for (let i = 0; i < nbOfQuestions; i++) {
    responses[`generated-question-${i}`] = [];
  }
  db
    .collection('templates')
    .doc(templateId)
    .collection('sessions')
    .doc(`generated-session-0`)
    .set({
      curStatus: 'waitingParticipants',
      curPageIndex: 0,
      curPageStatus: { questionStatus: 'showTitle' },
      responses,
    });

  // Generate nbOfQuestions questions in "templates/:templateId/questions/:questionId"
  for (let i = 0; i < nbOfQuestions; i++) {
    db
      .collection('templates')
      .doc(templateId)
      .collection('questions')
      .doc(`generated-question-${i}`)
      .set({
        title: `Question ${i}`,
        answers: [
          {
            isCorrect: true,
            label: ['France', 'Spain', 'Germany'][
              Math.floor(3 * Math.random())
            ],
          },
          {
            isCorrect: false,
            label: ['United-Sates', 'Mexico', 'Brasil'][
              Math.floor(3 * Math.random())
            ],
          },
          {
            isCorrect: false,
            label: ['China', 'Japan', 'Korea'][Math.floor(3 * Math.random())],
          },
          {
            isCorrect: false,
            label: 'D, the answer D',
          },
        ],
      });
  }
}

export default createTemplateWithSession;
