const passwordInput = document.getElementById("passwordInput");
const commandInput = document.getElementById("commandInput");
const loginDiv = document.getElementById("login");
const consoleDiv = document.getElementById("terminal");
const output = document.getElementById("output");

let attempts = 0;

// reversed Base64 of "poweritem"
const encryptedPassword = "tVGdpJXZ39Gc";

function print(text) {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = passwordInput.value.trim();
    const encoded = btoa(input).split("").reverse().join("");

    if (encoded === encryptedPassword) {
      loginDiv.classList.add("hidden");
      consoleDiv.classList.remove("hidden");
      print("ACCESS GRANTED");
      print("Type 'help' to see available commands.");
      commandInput.focus();
    } else {
      attempts++;
      print("ACCESS DENIED");
      passwordInput.value = "";

      if (attempts >= 5) {
        print("TRACE DETECTED. TERMINAL LOCKED.");
        passwordInput.disabled = true;
      }
    }
  }
});

commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = commandInput.value.trim().toLowerCase();
    commandInput.value = "";

    print("> " + cmd);

    switch (cmd) {
      case "help":
        print("AVAILABLE COMMANDS:");
        print("- help");
        print("- nether");
        break;

      case "nether":
        print("SCANNING NODE...");
        setTimeout(() => {
          print("FRAGMENT FOUND");
          print("NETHER COORDINATES:");
          print("X: 599");
          print("Y: 116");
          print("Z: 619");
        }, 800);
        break;

      default:
        print("UNKNOWN COMMAND");
    }
  }
});
