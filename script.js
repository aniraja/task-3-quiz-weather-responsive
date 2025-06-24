// ===== QUIZ SECTION =====
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JQuery"],
    correct: 1
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Python Script", "Vue"],
    correct: 1
  }
];

let currentQuestion = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].correct;
  if (selected === correct) {
    alert("✅ Correct Answer!");
  } else {
    alert("❌ Wrong Answer!");
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = "<h3>🎉 Quiz Completed!</h3>";
  }
}

// ===== WEATHER SECTION =====
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "3e8f7e69f0e8da6bd4fd8fad540c4677";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      result.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    result.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>🌥️ Condition: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error("API fetch error:", error);
    result.innerHTML = "<p>Error fetching weather data. Please try again later.</p>";
  }
}

// ===== Load Quiz on Page Load =====
window.onload = loadQuestion;
