# Gemini Frontend Clone

A modern Gemini AI Chat App frontend built using **React**, **Tailwind CSS**, **Redux**, and **React Hook Form**. This project mimics Gemini’s chat interface with OTP login, chatrooms, image support, and fake AI responses.

---

## 🔗 Live Preview

🌐 **Live Link**: [https://your-deployment-link.com](https://your-deployment-link.com)

---

## Project Overview

This frontend clone demonstrates a Gemini-like user experience, including:

- OTP-based authentication (mocked)
- Multi-chatroom system with local chat history
- Fake Gemini responses with typing animation
- Image upload in chat (base64)
- Dark/light mode toggle
- Redux + LocalStorage sync
- Form validation via `react-hook-form`
- Optimized rendering using conditional rendering and animation

---

## Tech Stack

| Tech            | Purpose                        |
| --------------- | ------------------------------ |
| React + Vite    | Frontend + Fast dev server     |
| Tailwind CSS    | Utility-first styling          |
| Redux Toolkit   | State management (auth, chat)  |
| React Router    | SPA routing                    |
| React Hook Form | Form management and validation |
| React Hot Toast | Feedback & notifications       |

---

## Setup & Run Instructions

### 1. Clone the Repo

```
git clone https://github.com/karansuryawanshi/gemini-clone.git
cd gemini-clone
```

### 2. Install Dependencies

```
npm install
```

### 3. Start Dev Server

```
npm run dev
```

App runs at: http://localhost:5173

## Folder & Component Structure

src/
├── assets/ # Icons & images
├── components/ # Reusable components
│ ├── ChatInterface
│ ├── ChatroomItem
│ ├── ChatroomModel
│ ├── DashboardSkeleton
│ ├── Header
│ ├── LoginSkeleton
│ ├── Message
│ ├── OTPInput
│ ├── PhoneInput
│ ├── Sidebar
│ ├── Typewriter
├── context/
│ └── AppContext.jsx
├── pages/ # Main pages
│ ├── LoginPage.jsx
│ ├── DashboardPage.jsx
├── App.jsx
├── main.jsx
└── index.css

## Key Implementation Details

### Form Validation

- Used react-hook-form for OTP input and country code.

- Validates required fields, length (6 digits), and formats.

- No Zod used (per instruction).

### Country Code Auto-Fetch

- Used restcountries.com/v3.1/all?fields=name,idd API to get country codes.

- Default country set to India (+91), but supports all.

### Infinite Scroll (Static Simulation)

- Chatrooms load 20 dummy messages via generateDummyMessages.

- scrollIntoView ensures new messages always visible.

- Could easily connect to real backend for actual scroll-based loading.

### Throttling & Typing Animation

- AI “typing...” shown with delay (setTimeout 1.5s).

- Optional lodash.throttle can be added to input handlers if needed.

- State checks for showTyping to prevent multiple spinners.

## ScreenShots

**Login**
<img width="1919" height="870" alt="Image" src="https://github.com/user-attachments/assets/1fa3107c-fa52-4494-97ab-e9df837ce568" />

**OTP Validation**
<img width="1919" height="869" alt="Image" src="https://github.com/user-attachments/assets/0882f8d7-a648-4ffd-bba6-242e642a3533" />

**Dashboard**
<img width="1919" height="875" alt="Image" src="https://github.com/user-attachments/assets/0bd59c35-a70c-476f-a5df-64b98cb85f54" />

**Darkmode Dashboard**
<img width="1919" height="864" alt="Image" src="https://github.com/user-attachments/assets/a73e11fc-568e-480b-ad70-10c05d79784c" />
