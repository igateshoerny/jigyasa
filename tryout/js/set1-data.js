// tryout/js/set1-data.js
// SET LATIHAN 1 – GENERAL LEVEL
// 40 soal | 60 menit | Pilihan Ganda (A–D)

quizData = [
  // PART 1 – GRAMMAR AND STRUCTURE (12 soal)
  {
    category: "Grammar",
    question: "She ____ to school every day, but today she ____ by bus.",
    options: [
      "goes / is going",
      "go / goes",
      "is going / go",
      "going / goes"
    ],
    correctAnswer: 0
  },
  {
    category: "Grammar",
    question: "The students ____ the test before the bell rang.",
    options: ["finish", "finished", "had finished", "have finished"],
    correctAnswer: 2
  },
  {
    category: "Grammar",
    question: "If I ____ rich, I would travel around the world.",
    options: ["am", "was", "were", "been"],
    correctAnswer: 2
  },
  {
    category: "Grammar",
    question: "The book ____ you gave me is very interesting.",
    options: ["which", "who", "whose", "whom"],
    correctAnswer: 0
  },
  {
    category: "Grammar",
    question: "English ____ in many countries.",
    options: ["speak", "is speaking", "is spoken", "spoken"],
    correctAnswer: 2
  },
  {
    category: "Grammar",
    question: "My brother ____ football when I called him last night.",
    options: ["played", "was playing", "is playing", "has played"],
    correctAnswer: 1
  },
  {
    category: "Grammar",
    question: "The movie was ____ than the one we watched yesterday.",
    options: ["interest", "more interest", "more interesting", "most interesting"],
    correctAnswer: 2
  },
  {
    category: "Grammar",
    question: "Let’s go out, ____?",
    options: ["shall we", "will we", "don’t we", "aren’t we"],
    correctAnswer: 0
  },
  {
    category: "Grammar",
    question: "There isn’t ____ milk left in the fridge.",
    options: ["many", "a few", "much", "some"],
    correctAnswer: 2
  },
  {
    category: "Grammar",
    question: "Neither my friends nor I ____ going to the party.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 0
  },
  {
    category: "Grammar",
    question: "The teacher made the students ____ the homework again.",
    options: ["doing", "did", "do", "to do"],
    correctAnswer: 2
  },
  {
    category: "Grammar",
    question: "I wish it ____ tomorrow.",
    options: ["rain", "rains", "rained", "will rain"],
    correctAnswer: 2
  },

  // PART 2 – VOCABULARY AND LEXICAL INTUITION (8 soal)
  {
    category: "Vocabulary",
    question: "The opposite of “polite” is ____",
    options: ["friendly", "rude", "gentle", "kind"],
    correctAnswer: 1
  },
  {
    category: "Vocabulary",
    question: "“The weather is unpredictable.” The underlined word means ____",
    options: ["can be guessed", "cannot be guessed", "always same", "never changes"],
    correctAnswer: 1
  },
  {
    category: "Vocabulary",
    question: "He felt very ____ after hearing the bad news.",
    options: ["delighted", "cheerful", "upset", "excited"],
    correctAnswer: 2
  },
  {
    category: "Vocabulary",
    question: "The synonym of “huge” is ____",
    options: ["tiny", "enormous", "narrow", "slight"],
    correctAnswer: 1
  },
  {
    category: "Vocabulary",
    question: "“She always keeps her room neat.” The word “neat” means ____",
    options: ["messy", "clean", "dirty", "dark"],
    correctAnswer: 1
  },
  {
    category: "Vocabulary",
    question: "Choose the correct collocation:",
    options: ["make a homework", "do homework", "make homeworks", "do an homework"],
    correctAnswer: 1
  },
  {
    category: "Vocabulary",
    question: "The phrase “give up” means ____",
    options: ["continue", "stop trying", "start", "try again"],
    correctAnswer: 1
  },
  {
    category: "Vocabulary",
    question: "Which of these is an idiom?",
    options: ["break a leg", "take a walk", "open the door", "eat dinner"],
    correctAnswer: 0
  },

  // PART 3 – READING COMPREHENSION (10 soal)
  {
    category: "Reading",
    question: "What is Rani’s hobby?",
    options: ["Playing games", "Reading", "Drawing", "Writing"],
    correctAnswer: 1
  },
  {
    category: "Reading",
    question: "Where does Rani usually go every afternoon?",
    options: ["Her classroom", "The canteen", "The library", "The park"],
    correctAnswer: 2
  },
  {
    category: "Reading",
    question: "What kind of books does Rani like?",
    options: ["Science and animals", "Adventure", "Sports", "Cooking"],
    correctAnswer: 0
  },
  {
    category: "Reading",
    question: "What is Rani’s dream?",
    options: ["To be a teacher", "To be a doctor", "To be an astronaut", "To be a writer"],
    correctAnswer: 2
  },
  {
    category: "Reading",
    question: "The word “exploration” in the text is closest in meaning to ____",
    options: ["research", "destruction", "imagination", "explanation"],
    correctAnswer: 0
  },
  {
    category: "Reading",
    question: "Which is the fastest transportation according to the text?",
    options: ["Plane", "Train", "Bus", "Car"],
    correctAnswer: 0
  },
  {
    category: "Reading",
    question: "Which is the cheapest?",
    options: ["Plane", "Bus", "Train", "Taxi"],
    correctAnswer: 1
  },
  {
    category: "Reading",
    question: "What is the disadvantage of traveling by bus?",
    options: ["Too expensive", "Takes longer", "No view", "Too fast"],
    correctAnswer: 1
  },
  {
    category: "Reading",
    question: "Why do some people prefer traveling by train?",
    options: ["They can enjoy the view", "It’s the fastest", "It’s the cheapest", "It’s comfortable"],
    correctAnswer: 0
  },
  {
    category: "Reading",
    question: "The word “prefer” is closest in meaning to ____",
    options: ["like less", "hate", "like more", "avoid"],
    correctAnswer: 2
  },

  // PART 4 – ERROR RECOGNITION (5 soal)
  {
    category: "Error Recognition",
    question: "She don’t like coffee in the morning.",
    options: ["She", "don’t", "like", "in the morning"],
    correctAnswer: 1
  },
  {
    category: "Error Recognition",
    question: "The students is studying English now.",
    options: ["The", "students", "is", "studying"],
    correctAnswer: 2
  },
  {
    category: "Error Recognition",
    question: "I am very interesting in this subject.",
    options: ["am", "very", "interesting", "in"],
    correctAnswer: 2
  },
  {
    category: "Error Recognition",
    question: "They have went to Jakarta twice.",
    options: ["have", "went", "to", "twice"],
    correctAnswer: 1
  },
  {
    category: "Error Recognition",
    question: "My mother is the most kind person in my family.",
    options: ["is", "the", "most", "kind"],
    correctAnswer: 3
  },

  // PART 5 – FUNCTIONAL EXPRESSION (5 soal)
  {
    category: "Functional Expression",
    question: "A: Can I borrow your pen?<br>B: ____",
    options: ["Yes, here you are.", "No, I can’t.", "I’m fine.", "See you later."],
    correctAnswer: 0
  },
  {
    category: "Functional Expression",
    question: "A: Thank you for your help.<br>B: ____",
    options: ["You’re welcome.", "No problem.", "That’s right.", "Both A and B."],
    correctAnswer: 3
  },
  {
    category: "Functional Expression",
    question: "A: How about going to the beach this weekend?<br>B: ____",
    options: ["That’s a good idea.", "I don’t like books.", "Yes, she is.", "Thank you."],
    correctAnswer: 0
  },
  {
    category: "Functional Expression",
    question: "A: Excuse me, where is the nearest ATM?<br>B: ____",
    options: ["It’s next to the supermarket.", "Yes, I do.", "I’m fine, thanks.", "Thank you."],
    correctAnswer: 0
  },
  {
    category: "Functional Expression",
    question: "A: Good luck for your competition!<br>B: ____",
    options: ["I hope so.", "Thanks.", "You too.", "It’s okay."],
    correctAnswer: 1
  }

];
