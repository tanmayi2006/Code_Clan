import pyaudio
import json
import sys
from vosk import Model, KaldiRecognizer

# Load Vosk model
model_path = "transcript_models/vosk-model-en-in-0.5"
model = Model(model_path)

# Initialize audio stream (microphone input)
p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=4000)

# Initialize recognizer
rec = KaldiRecognizer(model, 16000)

print("Transcription service started...", flush=True)  # Flush ensures it appears immediately

while True:
    data = stream.read(4000, exception_on_overflow=False)
    if rec.AcceptWaveform(data):
        result = json.loads(rec.Result())["text"]
        print(result, flush=True)  # Send result to Node.js
