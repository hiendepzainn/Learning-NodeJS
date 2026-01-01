const getCurrentTime = () => {
  const time = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

const input = document.getElementById("chatInput");
const button = document.getElementById("sendBtn");
const frame = document.getElementById("chatMessages");

const handleSendMessage = async () => {
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
  input.value = "";

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

  const responseElement = `
    <div class="message">
      <div class="text-bot">
      ${response.answer}
      </div>
      <div class="time-bot">${getCurrentTime()}</div>
    </div>
  `;

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
