let currentUser = "alice";
let socket;

// ---------------- USER SWITCH ----------------
function setUser(user) {
  currentUser = user;
  connectWebSocket();
  document.getElementById("chatBox").innerHTML = "";
  document.getElementById("status").innerText =
    "Status: Logged in as " + user + " (open second tab for other user)";
}

// ---------------- WEBSOCKET ----------------
function connectWebSocket() {
  if (socket) socket.close();

  socket = new WebSocket(
    `ws://127.0.0.1:8000/ws/chat?user=${currentUser}`
  );

  socket.onopen = () => {
    document.getElementById("status").innerText = "Status: Connected";
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.sender !== currentUser) {
      addMessage(`${data.sender}: ${atob(data.ciphertext)}`, false);
    }
  };

  socket.onclose = () => {
    document.getElementById("status").innerText = "Status: Disconnected";
  };
}

// ---------------- KEY GENERATION (DEMO) ----------------
async function generateAndUploadKeys() {
  console.log("RSA keys generated (demo)");
  alert("RSA keys generated & uploaded (demo)");
}

// ---------------- SEND MESSAGE ----------------
async function sendEncrypted() {
  const text = document.getElementById("messageInput").value.trim();
  if (!text) return;

  // AI moderation check
  const res = await fetch("http://127.0.0.1:8000/moderate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const result = await res.json();

  if (result.status === "UNSAFE") {
    alert("Blocked: " + result.reason);
    await fetch("http://127.0.0.1:8000/stats/update?blocked=true", { method: "POST" });
    return;
  }

  await fetch("http://127.0.0.1:8000/stats/update?blocked=false", { method: "POST" });

  const payload = {
    sender: currentUser,
    ciphertext: btoa(text),
    timestamp: new Date().toISOString()
  };

  // Show encrypted payload
  document.getElementById("payloadBox").innerText =
    JSON.stringify(payload, null, 2);

  socket.send(JSON.stringify(payload));
  addMessage(`${currentUser}: ${text}`, true);

  document.getElementById("messageInput").value = "";
}

// ---------------- UI MESSAGE ----------------
function addMessage(text, isMe) {
  const msg = document.createElement("div");
  msg.className = "message " + (isMe ? "me" : "other");
  msg.innerText = text;
  document.getElementById("chatBox").appendChild(msg);
  msg.scrollIntoView();
}

// Auto start
connectWebSocket();
