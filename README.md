

# 📵 Meeting Focus Assistant

**Version 2 — Web App + Android Concept**

A smart assistant that helps you stay focused and interruption-free during important meetings, video calls, or interviews across platforms like **Google Meet, Zoom, Microsoft Teams, WhatsApp Video/Call, and more.**

---

## 🚀 Features

✅ **Smart Meeting Scheduler**  
Schedule your meeting times manually or sync with your Google Calendar.

✅ **Focus Mode Automations**  
Enable custom device settings like Do Not Disturb, sound/vibration mute, and WiFi-only mode during scheduled events.

✅ **Auto-Reply for WhatsApp & SMS** *(Android only)*  
Auto-respond to WhatsApp or SMS messages when you’re in a meeting. *(Planned Android integration)*

✅ **Custom Whitelist Rules**  
Allow calls/messages from specific contacts even during focus mode.

✅ **Cross-Platform Notifications**  
Browser alerts before meetings start. Extendable to Android background service or Chrome extension.

✅ **Reminders & Analytics**  
Get reminded before meetings and review your weekly focus time stats.

---

## 🌐 Tech Stack

| Platform        | Stack/Tool               |
|-----------------|--------------------------|
| Frontend        | React + Tailwind CSS     |
| Backend (Web)   | Node.js / Flask (Pluggable) |
| Android (Optional) | Kotlin + Accessibility APIs |
| Notifications   | Push API, WebSockets     |
| Calendar Sync   | Google Calendar API      |

---

## 🔧 Setup (Web App)

```bash
git clone https://github.com/your-username/meeting-focus-assistant.git
cd meeting-focus-assistant
npm install
npm run dev
```

---

## 📱 Planned Android Features

- Toggle Do Not Disturb using Accessibility Services
- Auto-reply to WhatsApp and SMS using Notification Access
- Silent Mode with app whitelist
- Light native app to sync with web scheduler

---

## ✨ Future Improvements

- AI-based context detection to detect real-time meetings
- Browser plugin for instant mute + redirect
- Zoom/Meet SDK integration for live session detection
- GPT-based message summarizer post-meeting

---

## 📸 UI Preview (Web App)

> *Coming Soon: Upload screenshots or demo GIF here*

---

## 📂 Repository Structure

```
/frontend      - React app
/backend       - Flask or Node backend
/android       - Kotlin prototype (optional)
/public        - Assets
README.md
```

---

## 🧠 Inspiration

This app is built to **solve real-life interruptions** professionals face while attending video calls and interviews — especially when **WhatsApp, phone calls, or other messages pop up mid-session**.

---

## 🤝 Contributing

Feel free to fork this repo and submit pull requests for:
- Android enhancements
- Cross-browser extension support
- Auto-response logic

---

## 📄 License

MIT License
