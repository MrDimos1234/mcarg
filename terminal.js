const correctPassword = "poweritem"; // Password to unlock terminal
const bootText = [
  "BOOTING MEMORY NODE...",
  "CHECKSUM FAILED",
  "RECOVERING FRAGMENTS...",
  "READY",
  ""
];

const bootDiv = document.getElementById("boot");
const loginDiv = document.getElementById("login");
const terminalDiv = document.getElementById("terminal");
const outputDiv = document.getElementById("output");

const passwordInput = document.getElementById("passwordInput");
const commandInput = document.getElementById("commandInput");

let attempts = 0;
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

// Handle password input
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (passwordInput.value.trim() === correctPassword) {
      loginDiv.classList.add("hidden");
      terminalDiv.classList.remove("hidden");
      print("ACCESS GRANTED\nType 'help' to see available commands.\n");
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

// Print to terminal
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
      print("AVAILABLE COMMANDS:\n- help\n- cords\n\n");
    } 
    else if (cmd === "cords") {
      runCords();
    } 
    else {
      print("UNKNOWN COMMAND\n\n");
    }
  }
});

// Show Nether coordinates
function runCords() {
  const logs = [
    "SCANNING NODE...",
    "FRAGMENT FOUND...",
    "RETRIEVING COORDINATES...\n"
  ];

  let index = 0;
  const logInterval = setInterval(() => {
    if (index < logs.length) {
      print(logs[index] + "\n");
      index++;
    } else {
      clearInterval(logInterval);
      print("NETHER COORDINATES REVEALED: X=324 Z=-118\n\n");
    }
  }, 700);
}
