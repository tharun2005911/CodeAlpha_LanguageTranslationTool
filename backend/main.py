from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests


load_dotenv()

libretranslate_url = os.getenv("LIBRETRANSLATE_URL")


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslationRequest(BaseModel):
    text: str
    source_language: str
    target_language: str


@app.get("/")
def home():
    return {
        "message": "Welcome to my language translator"
    }


@app.get("/languages")
def get_languages():

    response = requests.get(
        libretranslate_url + "/languages"
    )

    return response.json()


@app.post("/translate")
def translate(request: TranslationRequest):

    data = {
        "q": request.text,
        "source": request.source_language,
        "target": request.target_language
    }

    response = requests.post(
        libretranslate_url + "/translate",
        json=data
    )

    translated_text = response.json()["translatedText"]

    return {
        "translated_text": translated_text
    }