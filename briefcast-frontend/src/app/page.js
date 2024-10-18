import AudioUploader from './components/AudioUploader';
import Summarizer from './components/Summarizer';


export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">NLP Audio and Summarization</h1>
      <div className="flex flex-col space-y-10">
        <AudioUploader />
        <Summarizer />
      </div>
    </div>
  );
}
