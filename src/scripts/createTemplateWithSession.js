import db from 'backend/db';

function createTemplateWithSession(nbOfQuestions = 10) {
  const templateId = 'generated-' + Date.now();

  // Generate one template in "templates/:templateId"
  db
    .collection('templates')
    .doc(templateId)
    .set({
      name: 'Generated Template from scripts',
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
    responses[`generated-question-${i}`] = Array(3)
      .fill()
      .map((x, i) => ({
        answerIndex: Math.floor(4 * Math.random()),
        userId: 'generated',
      }));
  }
  db
    .collection('templates')
    .doc(templateId)
    .collection('sessions')
    .doc(`generated-session-0`)
    .set({
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
            label: 'Answer 0',
          },
          {
            isCorrect: false,
            label: 'Answer 1',
          },
          {
            isCorrect: false,
            label: 'Answer 2',
          },
          {
            isCorrect: false,
            label: 'Answer 3',
          },
        ],
      });
  }
}

export default createTemplateWithSession;
