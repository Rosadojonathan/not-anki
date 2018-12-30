const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => (
    Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
);

export const TODAY = getDaysSinceEpoch();

export const initialData = {
    Russian: {
      title: 'Russian',
      vocab: [
        {
          recto: 'Иностранный пехотинец, которого я в прошлом году купил за тысячу баксов, теперь стоит полторы.',
          verso: 'The alien infantryman I got last year for 1,000 bucks now is worth $1,500.',
          difficulty: 0.3,
          id:1,
          update:17658,
          dueDate: TODAY,
          success:0,
          interval: 1,
  
        },
        {
          recto: 'Как-то много усилий ради того, чтобы добыть воду.',
          verso: 'Well, it seems like a lot of work just to get some water',
          difficulty: 0.3,
          id:2,
          update:17658,
          dueDate: TODAY,
          success:0,
          interval: 1,



        },
        {
          recto:'Ты утомился и перенервничал.',
          verso:"You're worn out and nervous.",
          difficulty: 0.3,
          id:3,
          update:17658,
          dueDate: TODAY,
          success:0,
          interval: 1,


        
        },
        {
          recto:"Вам не обязательно одновременно туда бежать.",
          verso:"You don't all have to run over there at once.",
          difficulty: 0.3,
          id:4,
          update:17658,
          dueDate: TODAY,
          success:0,
          interval: 1,



        },
        {
          recto:"Скорее всего я буду напрягаться, злиться и волноваться еще не раз в ближайшие 40 лет.",
          verso:"It is possible that I might be mad or tense or excited more than once in the next 40 years.",
          difficulty: 0.3,
          id:5,
          update:17658,
          dueDate: TODAY,
          success:0,
          interval: 1,



        },
        {
          recto:"Сегодня мы с особым удовлетворением отмечаем важное событие, связанное с Конвенцией.",
          verso:"Today, it is with special satisfaction that we note an important development with regard to the CWC.",
          difficulty: 0.3,
          id:6,
          update:17656,
          dueDate: TODAY,
          success:0,
          interval: 1,



        },
        {
          recto:"Вы тыкаете мне пушкой в лицо и снесли входную дверь, уж простите я немного перенервничал.",
          verso:"You're pointing guns in my face and you knocked down my door, so forgive me if I'm nervous.",
          difficulty: 0.3,
          id:7,
          update:17656,
          dueDate: TODAY,
          success:0,
          interval: 1,


        }
      ]
    },
    German: {
      title: 'German',
      vocab: [
        {
          recto: 'Die Deutschen',
          verso: "the Germans",
          difficulty: 0.3,
          id:1,
          update:17656,
          dueDate: TODAY,
          success:0,
          interval: 1,
        },
        {
          recto: 'Ausland',
          verso: 'Abroad',
          difficulty: 0.3,
          id:2,
          update:17658,
          dueDate: TODAY,
          success:0,
          interval: 1,
        }
      ]
    }
  };