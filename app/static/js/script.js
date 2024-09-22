function switchSignup() {
  console.log("signup");
  const error = document.getElementById("centerModalError");
  const signup = document.getElementById("centerModalSignup");
  const login = document.getElementById("centerModalLogin");
  signup.classList.remove("hidden");
  login.classList.add("hidden");
  error.classList.add("hidden");
}

function switchLogin() {
  console.log("login");
  const error = document.getElementById("centerModalError");
  const signup = document.getElementById("centerModalSignup");
  const login = document.getElementById("centerModalLogin");
  signup.classList.add("hidden");
  error.classList.add("hidden");
  login.classList.remove("hidden");
}

function switchError() {
  console.log("error");
  const error = document.getElementById("centerModalError");
  const signup = document.getElementById("centerModalSignup");
  const login = document.getElementById("centerModalLogin");
  error.classList.remove("hidden");
  signup.classList.add("hidden");
  login.classList.add("hidden");
}

function openModalLogin() {
  const modal = document.getElementById("modalFullscreen");
  modal.classList.remove("hidden");
  switchLogin();
}

function openModalSignup() {
  const modal = document.getElementById("modalFullscreen");
  modal.classList.remove("hidden");
  switchSignup();
}

function openModalError() {
  const modal = document.getElementById("modalFullscreen");
  modal.classList.remove("hidden");
  switchError();
}

function dismiss() {
  const modal = document.getElementById("modalFullscreen");
  modal.classList.add("hidden");
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        return response.json();
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  return false;
}

function signup() {
  const username = document.getElementById("signupUsername").value;
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPass").value;

  fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, email, password }),
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.success) {
        console.log("Signup Successful")
      }
      else {
        document.getElementById("signupError").textContent = data.error
        document.getElementById("signupError").classList.remove("hidden")
      }
    })
    .catch((error) => console.error(error));

  return false;
}

document.querySelectorAll(".dropdown").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.querySelector(".dropdown-menu").classList.toggle("hidden");
  });
});

window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

// function TriviaCard({ name, category, emoji, bgColor, desc }) {
//   return `
// <div class="group">
// <div class="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
//   <div class="w-24 h-24 ${bgColor} rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse">
//     <span class="text-4xl">${emoji}</span>
//   </div>
//   <h3 class="text-xl font-bold text-white mb-1">${name}</h3>
//   <p class="text-sm text-gray-400">${category}</p>
//   <p class="text-sm text-gray-400 text-center">${desc}</p>
// </div>
// </div>
// `;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const triviaContainer = document.getElementById("triviaContainer");
//   const initialTriviaCards = [
//     {
//       name: "Pyther",
//       category: "Python",
//       emoji: "🐍",
//       bgColor: "bg-green-500",
//       desc: "A Matrixmon that uses its Python-based attacks with cunning precision",
//     },
//     {
//       name: "Javascropt",
//       category: "JavaScript",
//       emoji: "🦂",
//       bgColor: "bg-orange-500",
//       desc: "A dynamic Matrixmon that brings interactive creativity to life",
//     },
//     {
//       name: "Scratee",
//       category: "Scratch",
//       emoji: "🐱",
//       bgColor: "bg-yellow-500",
//       desc: "A playful and curious Matrixmon that loves engaging experiences",
//     },
//   ];

//   const additionalTriviaCards = [
//     {
//       name: "LOOPY",
//       category: "Loops",
//       emoji: "🔄",
//       bgColor: "bg-blue-500",
//       desc: "",
//     },
//     {
//       name: "CONDY",
//       category: "Conditionals",
//       emoji: "🔀",
//       bgColor: "bg-green-500",
//       desc: "",
//     },
//     {
//       name: "FUNCY",
//       category: "Functions",
//       emoji: "🧩",
//       bgColor: "bg-yellow-500",
//       desc: "",
//     },
//     {
//       name: "VARI",
//       category: "Variables",
//       emoji: "📦",
//       bgColor: "bg-purple-500",
//       desc: "",
//     },
//     {
//       name: "ARRY",
//       category: "Arrays",
//       emoji: "📚",
//       bgColor: "bg-red-500",
//       desc: "",
//     },
//     {
//       name: "BUGSY",
//       category: "Debugging",
//       emoji: "🐞",
//       bgColor: "bg-pink-500",
//       desc: "",
//     },
//   ];

//   triviaContainer.innerHTML = initialTriviaCards
//     .map((card) => TriviaCard(card))
//     .join("");

//   const pytherButton = triviaContainer.children[0];
//   pytherButton.addEventListener("click", function handleClick() {
//     const newCards = additionalTriviaCards
//       .map((card) => TriviaCard(card))
//       .join("");
//     triviaContainer.innerHTML += newCards;
//     pytherButton.classList.add("hidden");
//     initialTriviaCards.forEach((card, index) => {
//       triviaContainer.children[index].classList.add("hidden");
//     });
//     pytherButton.removeEventListener("click", handleClick);
//   });
// });

function createElement(type, props = {}, ...children) {
  const element = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") {
      element.setAttribute("class", value);
    } else if (key.startsWith("on")) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element[key] = value;
    }
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  });
  return element;
}

// Trivia Card Component
function TriviaCard({ name, category, emoji, bgColor, desc, onClick }) {
  return createElement(
    "div",
    { className: "group cursor-pointer", onClick },
    createElement(
      "div",
      {
        className: `h-60 flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl`,
      },
      createElement(
        "div",
        {
          className: `w-24 h-24 ${bgColor} rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse`,
        },
        createElement("span", { className: "text-4xl" }, emoji)
      ),
      createElement(
        "h3",
        { className: "text-xl font-bold text-white mb-1" },
        name
      ),
      createElement("p", { className: "text-sm text-gray-400" }, category),
      createElement(
        "p",
        { className: "text-xs text-gray-500 mt-6 text-center" },
        desc
      )
    )
  );
}

// Level Selection Component
function LevelSelection({ category, levels, onStart }) {
  const levelButtons = levels.map((level, index) =>
    createElement(
      "button",
      {
        className: `w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
          index === 0 ? "bg-primary text-white" : "bg-gray-700 text-gray-300"
        } hover:bg-primary hover:text-white transition-colors`,
        onClick: () => onStart(level),
      },
      level.toString()
    )
  );

  return createElement(
    "div",
    {
      className:
        "bg-gray-800 rounded-lg p-8 max-w-md mx-auto w-full text-center",
    },
    createElement(
      "h2",
      { className: "text-3xl font-bold mb-6 text-primary" },
      `${category}`
    ),
    createElement("p", { className: "mb-4 text-xl" }, "Select a Level:"),
    createElement(
      "div",
      { className: "flex justify-center space-x-4 mb-8" },
      ...levelButtons
    ),
    createElement(
      "button",
      {
        className:
          "bg-secondary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-secondary/80 transition-colors",
        onClick: () => onStart(1),
      },
      "Start Quiz"
    )
  );
}

// Quiz Question Component
function QuizQuestion({
  question,
  options,
  onAnswer,
  timeLeft,
  questionNumber,
  totalQuestions,
}) {
  const optionButtons = options.map((option) =>
    createElement(
      "button",
      {
        className:
          "w-full py-3 px-4 bg-gray-700 hover:bg-primary text-left rounded-lg transition-colors",
        onClick: () => onAnswer(option),
      },
      option
    )
  );

  return createElement(
    "div",
    { className: "bg-gray-800 rounded-lg p-8 max-w-md mx-auto w-full" },
    createElement(
      "div",
      { className: "flex justify-between items-center mb-6" },
      createElement(
        "span",
        { className: "text-xl font-semibold" },
        `${questionNumber}/${totalQuestions}`
      ),
      createElement(
        "span",
        { className: "text-xl font-semibold text-primary" },
        `${timeLeft}s`
      )
    ),
    createElement("h2", { className: "text-2xl mb-6" }, question),
    createElement("div", { className: "space-y-3" }, ...optionButtons)
  );
}

// Main App Logic
const mainContent = document.getElementById("mainContent");
let currentLanguage = "";
let currentCategory = "";
let currentLevel = 1;
let score = 0;
let questionIndex = 0;
let timeLeft = 30;
let timer;

const quizData = {
  Pyther: {
    name: "Pyther",
    category: "Python",
    emoji: "🐍",
    bgColor: "bg-green-500",
    desc: "A Matrixmon that uses its Python-based attacks with cunning precision",
    subcategories: [
      { name: "Loops", category: "", emoji: "🔄", bgColor: "bg-blue-500" },
      {
        name: "Conditionals",
        category: "",
        emoji: "🔀",
        bgColor: "bg-green-500",
      },
      {
        name: "Functions",
        category: "",
        emoji: "🧩",
        bgColor: "bg-yellow-500",
      },
      {
        name: "Variables",
        category: "",
        emoji: "📦",
        bgColor: "bg-purple-500",
      },
      { name: "Arrays", category: "", emoji: "📚", bgColor: "bg-red-500" },
      {
        name: "Debugging",
        category: "",
        emoji: "🐞",
        bgColor: "bg-pink-500",
      },
    ],
  },
  Javascropt: {
    name: "Javascropt",
    category: "JavaScript",
    emoji: "🦂",
    bgColor: "bg-orange-500",
    desc: "A dynamic Matrixmon that brings interactive creativity to life",
    subcategories: [
      { name: "Loops", category: "", emoji: "🔄", bgColor: "bg-blue-500" },
      {
        name: "Conditionals",
        category: "",
        emoji: "🔀",
        bgColor: "bg-green-500",
      },
      {
        name: "Functions",
        category: "",
        emoji: "🧩",
        bgColor: "bg-yellow-500",
      },
      {
        name: "Variables",
        category: "",
        emoji: "📦",
        bgColor: "bg-purple-500",
      },
      { name: "Arrays", category: "", emoji: "📚", bgColor: "bg-red-500" },
      {
        name: "Debugging",
        category: "",
        emoji: "🐞",
        bgColor: "bg-pink-500",
      },
    ],
  },
  Scratee: {
    name: "Scratee",
    category: "Scratch",
    emoji: "🐱",
    bgColor: "bg-yellow-500",
    desc: "A playful and curious Matrixmon that loves engaging experiences",
    subcategories: [
      // Add Scratch-specific subcategories here
    ],
  },
};

const questions = {
  Pyther: {
    Loops: {
      1: [
        {
          question: "What is a 'for' loop in Python?",
          options: [
            "A loop that repeats a specific number of times",
            "A loop that runs forever",
            "A conditional statement",
            "A function definition",
          ],
          correctAnswer: "A loop that repeats a specific number of times",
        },
        {
          question: "What is the purpose of the 'range()' function in Python?",
          options: [
            "To generate a sequence of numbers",
            "To create a list of numbers",
            "To calculate the sum of a list of numbers",
            "To find the maximum value in a list of numbers",
          ],
          correctAnswer: "To generate a sequence of numbers",
        }
      ],
      2: [
        {
          question: "Which of these is a valid 'while' loop in Python?",
          options: [
            "while x < 10:",
            "while (x < 10)",
            "while x < 10",
            "while: x < 10",
          ],
          correctAnswer: "while x < 10:",
        },
        // Add more level 2 questions here
      ],
      // Add more levels here
    },

    // Add questions for other subcategories
  },
  Javascropt: {
    Loops: {
      1: [
        {
          question: "What is a 'for' loop in Python?",
          options: [
            "A loop that repeats a specific number of times",
            "A loop that runs forever",
            "A conditional statement",
            "A function definition",
          ],
          correctAnswer: "A loop that repeats a specific number of times",
        },
        // Add more level 1 questions here
      ],
      2: [
        {
          question: "Which of these is a valid 'while' loop in Python?",
          options: [
            "while x < 10:",
            "while (x < 10)",
            "while x < 10",
            "while: x < 10",
          ],
          correctAnswer: "while x < 10:",
        },
        // Add more level 2 questions here
      ],
      // Add more levels here
    },
    // Add questions for other subcategories
  },
};

function showLanguageSelection() {
  mainContent.innerHTML = "";
  const container = createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-8",
  });
  Object.values(quizData).forEach((language) => {
    container.appendChild(
      TriviaCard({
        ...language,
        onClick: () => {
          currentLanguage = language.name;
          showSubcategorySelection();
        },
      })
    );
  });
  mainContent.appendChild(
    createElement(
      "h2",
      { className: "text-4xl font-bold mb-12 text-center text-primary" },
      "Choose Your Coding Language"
    )
  );
  mainContent.appendChild(container);
}

function showSubcategorySelection() {
  mainContent.innerHTML = "";
  const container = createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-8",
  });
  quizData[currentLanguage].subcategories.forEach((subcategory) => {
    container.appendChild(
      TriviaCard({
        ...subcategory,
        onClick: () => {
          currentCategory = subcategory.name;
          console.log(currentCategory);
          showLevelSelection();
        },
      })
    );
  });
  mainContent.appendChild(
    createElement(
      "h2",
      { className: "text-4xl font-bold mb-12 text-center text-primary" },
      `Choose Your ${currentLanguage} Challenge`
    )
  );
  mainContent.appendChild(container);
  addBackButton(showLanguageSelection);

}

function showLevelSelection() {
  mainContent.innerHTML = "";
  mainContent.appendChild(
    LevelSelection({
      category: currentCategory,
      levels: [1, 2, 3, 4, 5],
      onStart: startQuiz,
    })
  );
  addBackButton(showSubcategorySelection);
}

function startQuiz(level) {
  currentLevel = level;
  questionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const levelQuestions =
    questions[currentLanguage][currentCategory][currentLevel];
  if (questionIndex >= levelQuestions.length) {
    showResult();
    return;
  }

  const question = levelQuestions[questionIndex];
  timeLeft = 30;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      questionIndex++;
      showQuestion();
    }
  }, 1000);

  mainContent.innerHTML = "";
  mainContent.appendChild(
    QuizQuestion({
      question: question.question,
      options: question.options,
      onAnswer: checkAnswer,
      timeLeft: timeLeft,
      questionNumber: questionIndex + 1,
      totalQuestions: levelQuestions.length,
    })
  );
  addBackButton(() => {
    clearInterval(timer);
    showLevelSelection();
  });
}

function checkAnswer(answer) {
  clearInterval(timer);
  const levelQuestions =
    questions[currentLanguage][currentCategory][currentLevel];
  if (answer === levelQuestions[questionIndex].correctAnswer) {
    score++;
  }
  questionIndex++;
  showQuestion();
}

function updateTimerDisplay() {
  const timerElement = mainContent.querySelector(".text-primary");
  if (timerElement) {
    timerElement.textContent = `${timeLeft}s`;
  }
}

function showResult() {
  mainContent.innerHTML = "";
  mainContent.appendChild(
    createElement(
      "div",
      {
        className:
          "bg-gray-800 rounded-lg p-8 max-w-md mx-auto w-full text-center",
      },
      createElement(
        "h2",
        { className: "text-3xl font-bold mb-6 text-primary" },
        "Quiz Complete!"
      ),
      createElement(
        "p",
        { className: "text-2xl mb-6" },
        `Your score: ${score}/${questions[currentLanguage][currentCategory][currentLevel].length}`
      ),
      createElement(
        "button",
        {
          className:
            "bg-secondary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-secondary/80 transition-colors mr-4",
          onClick: () => startQuiz(currentLevel),
        },
        "Play Again"
      ),
      createElement(
        "button",
        {
          className:
            "bg-primary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-primary/80 transition-colors",
          onClick: showLanguageSelection,
        },
        "Back to Languages"
      )
    )
  );
  updateScore(score);
  addBackButton(showSubcategorySelection);
}

function addBackButton(onClick) {
  const backButton = createElement('button', {
    className: 'mt-4 text-gray-400 hover:text-white transition',
    onClick: onClick
  }, '← Back');
  mainContent.appendChild(backButton);
}

function updateScore(score) {
  fetch('/update_score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score: score }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Score updated successfully');
    } else {
      console.error('Failed to update score');
    }
  });
}

function showLeaderboard() {
  window.location.href = '/leaderboard';
}

// Modify your existing navigation to include the leaderboard link
document.querySelector('a[href="#"]').addEventListener('click', (e) => {
  e.preventDefault();
  showLeaderboard();
});


// Initialize the app
showLanguageSelection();