# 🧠 AI-Powered Image Caption Generator

This project is a full-stack web application that generates natural language captions for uploaded images using **Google’s Gemini Generative Language API**.  
It integrates an AI-powered backend written in **Python**, a responsive **React.js** frontend, and is deployed on **Vercel**.

---

## 🚀 Features
- Generates intelligent, human-like captions for images using Google’s multimodal Gemini API.
- Simple web interface for uploading and viewing results in real-time.
- Fast deployment on **Vercel** with environment variable security.
- Modular architecture for easy extension or API integration.

---

## 🧩 Tech Stack
**Frontend:** React.js  
**Backend:** Python (Flask/FastAPI or Google Generative AI SDK)  
**AI Model:** Google Gemini Vision API (`gemini-1.5-flash`)  
**Deployment:** Vercel

---

## ⚙️ Setup Instructions

### 1. Clone this repository
```bash
git clone https://github.com/<your-username>/image-caption-generator.git
cd image-caption-generator
```

### 2. Install dependencies
**Frontend:**
```bash
cd frontend
npm install
```

**Backend (if applicable):**
```bash
pip install -r requirements.txt
```

### 3. Add your API Key
Create a `.env.local` file in the project root and add:
```
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Run locally
**Frontend:**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## 📸 Example Output
| Input Image | Generated Caption |
|--------------|------------------|
| 🏞️ Landscape | “A serene view of mountains and trees beneath a glowing sunset.” |
| 🐶 Dog | “A happy brown dog playing on a grassy field.” |

---

## 📁 Folder Structure
```
├── frontend/           # React.js client
├── backend/            # Python API (optional if using direct calls)
├── public/             # Static assets
├── .env.local          # API keys (ignored in git)
└── README.md
```

---

## 📜 License
This project is open-source under the **MIT License**.

---

### 👨‍💻 Author
**Aazil Moideen**  
📧 [aazilmoideen@gmail.com](mailto:aazilmoideen@gmail.com)  
🔗 [GitHub](https://github.com/aazil-m) | [LinkedIn](https://www.linkedin.com/in/aazil-moideen/)
