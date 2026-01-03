const bootText = [
  "BOOTING MEMORY NODE...",
  "CHECKSUM FAILED",
  "RECOVERING FRAGMENTS...",
  "READY",
  ""
];

const correctPassword = "poweritem"; // ← password from riddle
let attempts = 0;

const bootDiv = document.getElementById("boot");
const loginDiv = document.getElementById("login");
const terminalDiv = document.getElementById("terminal");
const outputDiv = document.getElementById("output");

const passwordInput = document.getElementById("passwordInput");
const commandInput = document.getElementById("commandInput");

let i = 0;

// Boot sequence
const bootInterval = setInterval(() => {
  if (i < bootText.length) {
    bootDiv.textContent += bootText[i] + "\n";
    i++;
  } else {
    clearInterval(bootInterval);
    loginDiv.classList.remove("hidden");
    passwordInput.focus();
  }
}, 500);

// Password handling
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (passwordInput.value === correctPassword) {
      loginDiv.classList.add("hidden");
      terminalDiv.classList.remove("hidden");
      print("ACCESS GRANTED\n");
      commandInput.focus();
    } else {
      attempts++;
      print("ACCESS DENIED\n");
      passwordInput.value = "";

      if (attempts >= 5) {
        print("TRACE ACTIVE. CONNECTION LOCKED.\n");
        passwordInput.disabled = true;
      }
    }
  }
});

// Terminal output
function print(text) {
  outputDiv.textContent += text;
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Command handling
commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = commandInput.value.trim().toLowerCase();
    print(`> ${cmd}\n`);
    commandInput.value = "";

    if (cmd === "help") {
      print("AVAILABLE COMMANDS:\n- help\n\n");
    } 
    else if (cmd === "poweritem") {
      runPowerItem();
    } 
    else {
      print("UNKNOWN COMMAND\n\n");
    }
  }
});

// poweritem command
function runPowerItem() {
  const logs = [
    "SCANNING MEMORY...",
    "FRAGMENT FOUND",
    "RELEASING PIECE...",
    "EXPORTING AUDIO FRAGMENT...\n"
  ];

  let index = 0;
  const logInterval = setInterval(() => {
    if (index < logs.length) {
      print(logs[index] + "\n");
      index++;
    } else {
      clearInterval(logInterval);
      triggerDownload();
    }
  }, 700);
}

// Sound file trigger
function triggerDownload() {
  const link = document.createElement("a");
  link.href = "sound/fragment.wav";
  link.download = "fragment.wav";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  print("DONE.\n");
}
