from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import contractions

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Sentence(BaseModel):
    text: str

@app.post("/expand")
def expand_contractions(sentence: Sentence):
    fixed = contractions.fix(sentence.text)
    return {"expanded": fixed}