import queue
import pyaudio
import wave
import numpy as np
from transformers import pipeline
import re

# Load Whisper ASR model
model_id = "openai/whisper-small"
transcribe = pipeline("automatic-speech-recognition", model=model_id, chunk_length_s=30, device="cpu")

# Force model to use Telugu or English
transcribe.model.config.forced_decoder_ids = transcribe.tokenizer.get_decoder_prompt_ids(language="te", task="transcribe")

# Audio settings
FORMAT = pyaudio.paInt16  # 16-bit PCM
CHANNELS = 1              # Mono audio
RATE = 16000              # 16kHz sample rate (Whisper requirement)
CHUNK = 1024

# Create audio queue
audio_queue = queue.Queue()

# PyAudio callback
def callback(in_data, frame_count, time_info, status):
    audio_queue.put(in_data)
    return (in_data, pyaudio.paContinue)

# Initialize PyAudio
p = pyaudio.PyAudio()
stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True,
                frames_per_buffer=CHUNK, stream_callback=callback)

print("🎙️ Listening to live radio... Press Ctrl+C to stop.")

try:
    while True:
        # Collect audio chunks
        frames = []
        for _ in range(50):  # Collect approximately 3 seconds of audio
            frames.append(audio_queue.get())

        # Convert to WAV format (raw PCM → WAV)
        audio_data = b''.join(frames)
        wav_filename = "temp_audio.wav"
        with wave.open(wav_filename, "wb") as wf:
            wf.setnchannels(CHANNELS)
            wf.setsampwidth(p.get_sample_size(FORMAT))
            wf.setframerate(RATE)
            wf.writeframes(audio_data)

        # Transcribe WAV file
        result = transcribe(wav_filename)

        # Remove unwanted characters (keep only Telugu & English)
        filtered_text = re.sub(r'[^\u0C00-\u0C7F\u0000-\u007F\s]', '', result["text"])

        print("📢", filtered_text)

except KeyboardInterrupt:
    print("\n🛑 Stopping transcription.")
    stream.stop_stream()
    stream.close()
    p.terminate()
