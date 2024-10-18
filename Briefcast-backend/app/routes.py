from flask import Blueprint, request, jsonify, render_template
import os
from .transcriber import transcribe_audio
from .summarizer import summarize_text

main = Blueprint('main', 'main')

# Home route (optional)
@main.route('/')
def index():
    return render_template('index.html')

# Route to handle audio file upload and transcription
@main.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join('audio', audio_file.filename)
    audio_file.save(audio_path)

    transcription_text = transcribe_audio(audio_path)

    transcription_path = os.path.join('transcription', f"{audio_file.filename}.txt")
    with open(transcription_path, 'w') as f:
        f.write(transcription_text)

    return jsonify({"transcription": transcription_text})

# Route to handle summarization
@main.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    summary = summarize_text(text)

    return jsonify({"summary": summary})
