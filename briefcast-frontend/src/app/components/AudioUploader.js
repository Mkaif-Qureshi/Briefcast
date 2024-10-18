'use client'
import { useState } from 'react';

export default function AudioUploader() {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('audio', file);

        const res = await fetch(' http://127.0.0.1:5000/transcribe', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setTranscription(data.transcription);
    };

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Upload an Audio File</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input type="file" accept="audio/*" onChange={handleFileChange} />
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">Transcribe</button>
            </form>
            {transcription && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
}
