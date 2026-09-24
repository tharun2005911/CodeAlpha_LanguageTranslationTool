# Language Translation Tool

A simple web-based language translation tool built with HTML, CSS, JavaScript, Python, FastAPI, and LibreTranslate.

## Features

- Translate text between available languages
- Select source and target languages
- Swap source and target languages
- Copy translated text
- Listen to the translated text using text-to-speech
- Input validation and error handling
- Responsive interface for smaller screens

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- FastAPI
- LibreTranslate
- REST API
- Git and GitHub

## How It Works

1. The user enters text in the frontend.
2. The user selects the source and target languages.
3. JavaScript sends the translation request to the FastAPI backend.
4. FastAPI sends the request to the LibreTranslate service.
5. LibreTranslate processes the translation and returns the translated text.
6. FastAPI sends the translated text back to the frontend.
7. The frontend displays the translated text.

## Project Structure

```text
Language Translation Tool/
|-- backend/
|   |-- main.py
|
|-- frontend/
|   |-- index.html
|   |-- script.js
|   |-- style.css
|
|-- .gitignore
|-- .env
|-- README.md
```

## How to Run

1. Clone the repository.
2. Create and activate a Python virtual environment.
3. Install the required Python packages.
4. Start the LibreTranslate server.
5. Start the FastAPI backend.
6. Start the frontend server.
7. Open the frontend in a web browser.

Install dependencies:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install fastapi uvicorn requests python-dotenv libretranslate
```

Start LibreTranslate:

```powershell
libretranslate
```

Start FastAPI:

```powershell
uvicorn backend.main:app --reload
```

Start the frontend:

```powershell
python -m http.server 5500 --directory frontend
```

Open `http://127.0.0.1:5500` in a web browser.

## Environment Configuration

Create a `.env` file in the project root and add:

```env
LIBRETRANSLATE_URL=http://127.0.0.1:5000
```

## Future Improvements

- Add more language support
- Add voice input using speech recognition
- Improve the user interface
- Deploy the application online
- Add translation history

## Learning Note

This project was developed as part of an AI internship learning experience to understand API integration, frontend-backend communication, and web application development.