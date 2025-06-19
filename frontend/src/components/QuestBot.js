import React, { useState } from 'react';

const QuestBot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('${process.env.REACT_APP_API_URL}/questbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error fetching response: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Error fetching response:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>QuestBot</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Sorunuzu buraya yazın..."
        rows="5"
        cols="50"
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={loading || !prompt}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading || !prompt ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Yükleniyor...' : 'Sor'}
      </button>
      <div style={{ marginTop: '20px' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Cevap:</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{response || 'Henüz bir cevap yok.'}</p>
      </div>
    </div>
  );
};

export default QuestBot;
