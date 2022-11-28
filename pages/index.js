import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react'

const Home = () => {
  const[input, setInput] =  useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleChange = (e) => {
    setInput(e.target.value);
  };


  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <Head>
        <title>Language2Code</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Language2Code</h1>
          </div>
          <div className="header-subtitle">
            <h2>"Language2Code" is a guide to translating English phrases into code.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="Code of..." 
            className="prompt-box" 
            value={input}
            onChange={toggleChange}
          />
          <div className="prompt-buttons">
            <a className={isGenerating ? "generate-button loading" : "generate-button"} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        {/* <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a> */}
      </div>
    </div>
  );
};

export default Home;
