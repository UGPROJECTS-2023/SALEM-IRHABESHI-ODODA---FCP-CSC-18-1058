from fastapi import FastAPI, WebSocket, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

import asyncio
import websockets

from transcriber import Transcriber

app = FastAPI(title="Real Time ASR system with Whisper")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

FILES_DICTIONARY = {
    "11011001": "Speech Transformer _ Automatic Speech Recognition (ASR).mp4",
    "102": "Playboi_Carti_-_Place-Sweethiphop.com.mp3"
}

@app.get("/transcription/{fileId}")
async def fetch_transcription(fileId: int):
    f_name = FILES_DICTIONARY[str(fileId)]
    T = Transcriber(filename=f_name)
    if T.check_file:
        if T.is_video():
            T.decode_video
        
        transcription = T.transcribe()

        await send_message(uri="ws://localhost:8081/en", message=transcription)
        return JSONResponse(content={"message": transcription}, status_code=status.HTTP_200_OK)
    else: raise f"file with Id = {fileId} does not exist in path"



async def send_message(uri, message):
    async with websockets.connect(uri) as websocket:
        await websocket.send(message)
        await websocket.close()
        return
