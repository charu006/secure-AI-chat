from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MODERATION ----------------
BAD_WORDS = {
    "kill", "hate", "abuse", "stupid", "dumb", "idiot", "moron"
}

class Message(BaseModel):
    text: str

@app.post("/moderate")
def moderate(msg: Message):
    text = msg.text.lower()
    for word in BAD_WORDS:
        if word in text:
            return {"status": "BLOCKED"}
    return {"status": "SAFE"}

# ---------------- WEBSOCKET ----------------
connections = []

@app.websocket("/ws/chat")
async def chat_socket(ws: WebSocket):
    await ws.accept()
    connections.append(ws)
    print("🟢 Client connected")

    try:
        while True:
            data = await ws.receive_text()
            for c in connections:
                await c.send_text(data)
    except WebSocketDisconnect:
        connections.remove(ws)
        print("🔴 Client disconnected")

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {"status": "Backend running"}
