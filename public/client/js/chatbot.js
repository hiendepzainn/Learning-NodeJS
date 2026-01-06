import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// convert HTML to DOM
const htmlToDom = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
};

// gradually display Text
const typeNode = async (sourceNode, targetParent, speed) => {
  for (const node of sourceNode.childNodes) {
    // TEXT NODE
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const textNode = document.createTextNode("");
      targetParent.appendChild(textNode);

      for (let i = 0; i < text.length; i++) {
        textNode.textContent += text[i];
        await sleep(speed);
      }
    }

    // ELEMENT NODE
    else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node.cloneNode(false); // clone tag only
      targetParent.appendChild(el);
      await typeNode(node, el, speed);
    }
  }
};

// delay SPEED
const sleep = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

// get randomString (length = 4)
const getRandomString = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

const getCurrentTime = () => {
  const time = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

// icon Typing...
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

// event SEND message
const handleSendMessage = async () => {
  button.disabled = true;

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
  const newID = getRandomString();
  const responseElement = `
    <div class="message">
      <div id="${newID}" class="text-bot"></div>
      <div class="time-bot">${getCurrentTime()}</div>
    </div>
  `;

  // remove Typing animation
  frame.lastElementChild.remove();

  // render BOT message
  frame.innerHTML += responseElement;

  const output = document.getElementById(newID);
  const dom = htmlToDom(htmlResponse);
  typeNode(dom, output, 15);

  button.disabled = false;
};

button.addEventListener("click", async () => {
  await handleSendMessage();
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    input.disabled = true;
    await handleSendMessage();
  }
  input.disabled = false;
});
