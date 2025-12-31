const input = document.getElementById("input-chatbot");
const button = document.getElementById("send-button");
const frame = document.getElementById("chatbot-frame");

const handleSendMessage = async () => {
  const message = input.value;
  const messageElement = document.createElement("div");
  messageElement.className = "text-end";
  messageElement.innerText = message;
  frame.appendChild(messageElement);
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

  const responseElement = document.createElement("div");
  responseElement.className = "text-start";
  responseElement.innerText = response.answer;
  frame.appendChild(responseElement);
};

button.addEventListener("click", async () => {
  await handleSendMessage();
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    await handleSendMessage();
  }
});
