import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const getCurrentTime = () => {
  const time = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

const getTypingIndicator = () => {
  const element = document.createElement("div");
  element.id = "bot-typing";
  element.className = "typing";
  element.innerHTML = "<span></span><span></span><span></span>";
  return element;
};

const input = document.getElementById("chatInput");
const button = document.getElementById("sendBtn");
const frame = document.getElementById("chatMessages");
const typingAnimation = getTypingIndicator();

const handleSendMessage = async () => {
  // render USER message
  const message = input.value;
  const messageElement = `
    <div class="message">
      <div class="text-user">
      ${input.value}
      </div>
      <div class="time-user">${getCurrentTime()}</div>
    </div>
  `;
  frame.innerHTML += messageElement;

  // render Typing animation
  frame.appendChild(typingAnimation);

  input.value = "";

  // call API chatbot Back-end
  const result = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: "userID",
      message: message,
    }),
  });

  const response = await result.json();
  const htmlResponse = marked.parse(response.answer);

  // CREATE response Element
  const responseElement = `
    <div class="message">
      <div class="text-bot">
      ${htmlResponse}
      </div>
      <div class="time-bot">${getCurrentTime()}</div>
    </div>
  `;

  // remove Typing animation
  frame.lastElementChild.remove();

  // render BOT message
  frame.innerHTML += responseElement;
};

button.addEventListener("click", async () => {
  await handleSendMessage();
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await handleSendMessage();
  }
});
