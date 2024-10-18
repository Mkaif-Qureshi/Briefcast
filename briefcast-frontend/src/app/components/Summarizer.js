'use client'
import { useState } from 'react';

export default function Summarizer() {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');

    const handleSummarize = async (e) => {
        e.preventDefault();

        const res = await fetch('http://127.0.0.1:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await res.json();
        setSummary(data.summary);
    };

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Summarize Text</h2>
            <form onSubmit={handleSummarize} className="flex flex-col space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to summarize..."
                    className="border p-2 rounded"
                ></textarea>
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">Summarize</button>
            </form>
            {summary && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}
