from translate import get_translate
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Python Flask/FastAPI сервер
app = FastAPI()

# Класс перевода
class TranslateRequest(BaseModel):
    text: str

# Заголовки что бы можно было передавать данные внутри запроса
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все источники
    allow_methods=["*"],  # Разрешить POST, GET, etc.
    allow_headers=["*"],  # Разрешить JSON заголовки
)

@app.post("/translate")
async def translate(request: TranslateRequest):
    result = await get_translate(request.text)
    return {"google": result[1], "wooordhunt": result[0]}

@app.post("/ping")
async def ping():
    return {}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=6767)
