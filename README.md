# Secure AI Chat 

Secure AI Chat is a real-time messaging application designed to demonstrate secure communication using modern cryptographic techniques and AI-based safety controls. The project focuses on protecting user privacy while ensuring responsible communication.

## Key Features

- **End-to-End Encryption (E2EE)**  
  Messages are encrypted on the sender’s side and decrypted only by the intended receiver.

- **Hybrid Encryption Model**
  - **AES (Advanced Encryption Standard)** is used for encrypting message content.
  - **RSA (Public-Key Cryptography)** is used to securely exchange AES session keys.

- **AI-Based Content Moderation**
  - Messages are checked for harmful or abusive content before transmission.
  - Unsafe messages are blocked and replaced with a system warning instead of displaying the original text.

- **Real-Time Messaging**
  - Uses **WebSockets** to enable instant message delivery between users (Alice & Bob demo).

- **WhatsApp-Style Chat Interface**
  - Clean UI with left/right aligned message bubbles.
  - Sender identity is clearly displayed.
  - Blocked messages are visually indicated.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** FastAPI (Python)  
- **Real-Time Communication:** WebSockets  
- **Cryptography:** AES, RSA  
- **Deployment:** GitHub Pages (Frontend)

## Purpose

This project was developed as an academic capstone to demonstrate secure communication, encryption principles, and AI-assisted moderation in a messaging system. It is suitable for academic evaluation and future enhancements.

---

 Developed by: Charu  
