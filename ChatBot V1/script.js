const userMessage = [
  ["hi", "hey", "hello"],
  ["sure", "yes", "no"],
  ["are you genious", "are you nerd", "are you intelligent"],
  ["i hate you", "i dont like you"],
  ["how are you", "how is life", "how are things", "how are you doing"],
  ["how is corona", "how is covid 19", "how is covid19 situation"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you", "who is your creator"],
  ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "ok", "okay", "nice", "welcome"],
  ["thanks", "thank you"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["corona", "covid19", "coronavirus"],
  ["you are funny"],
  ["i dont know"],
  ["boring"],
  ["im tired"]
];

const botReply = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  ["Okay"],
  ["Yes I am! "],
  ["I'm sorry about that. But I like you dude."],
  ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
  ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
  ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
  ["I am always young."],
  ["I am just a bot", "I am a bot. What are you?"],
  ["Sabitha Kuppusamy"],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  ["Briyani", "Burger", "Sushi", "Pizza"],
  ["Dude!"],
  ["Yes?"],
  ["Please stay home"],
  ["Glad to hear it"],
  ["Say something interesting"],
  ["Sorry for that. Let's chat!"],
  ["Take some rest, Dude!"]
];

const alternative = ["Same here, dude.", "That's cool! Go on...", "Dude...", "Ask something else...", "Hey, I'm listening..."];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.lang = "en-US";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  if (input !== "") {
    addChat(input, "user");
    showTypingIndicator();
    setTimeout(() => {
      output(input);
      hideTypingIndicator();
    }, 1000);
  }
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") sendMessage();
  });
});

function output(input) {
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "").trim();
  let product = compare(userMessage, botReply, text);
  addChat(product || alternative[Math.floor(Math.random() * alternative.length)], "bot");
  voiceControl(product || alternative[Math.floor(Math.random() * alternative.length)]);
}

function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    if (triggerArray[x].includes(string)) {
      let replies = replyArray[x];
      item = replies[Math.floor(Math.random() * replies.length)];
      break;
    }
  }
  return item || null;
}

function addChat(text, sender) {
  const mainDiv = document.getElementById("message-section");
  let messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
  messageDiv.innerHTML = `<span>${text}</span>`;
  mainDiv.appendChild(messageDiv);
  mainDiv.scrollTop = mainDiv.scrollHeight;
}

function showTypingIndicator() {
  const typingIndicator = document.createElement("div");
  typingIndicator.id = "typing-indicator";
  typingIndicator.classList.add("message", "bot-message");
  typingIndicator.innerHTML = "<span>Yadi BOT is typing...</span>";
  document.getElementById("message-section").appendChild(typingIndicator);
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) typingIndicator.remove();
}
