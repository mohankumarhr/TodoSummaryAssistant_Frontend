import React, { useState } from 'react'
import styles from '../css/HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

function Home() {
  
  


const navigate = useNavigate();
const [loader, setLoader] = useState(false)

  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [summaryData, setSummaryData] = useState({ summary: '', slackStatus: '' });

  const handleCreateTodo = async () => {
    try {
      await axios.post('http://localhost:8080/api/todos', {
        title: title,
        completed: 0,
      });
      alert('Todo created successfully');
      setShowPopup(false);
      setTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo');
    }
  };

  const handleSummarizeTodos = async () => {
    setLoader(true)
    try {
      const response = await axios.get('http://localhost:8080/api/summary');
      setSummaryData({
        summary: response.data.summary,
        slackStatus: response.data.slackStatus,
      });
    } catch (error) {
      console.error('Error summarizing todos:', error);
      alert('Failed to fetch summary');
    }
    setLoader(false)
  };

  if (loader) {
    return <div className={styles.loader}> <BounceLoader color="#0056b3" /> </div> 
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo Summary Assistant</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => setShowPopup(true)}>Create Todo</button>
        <button className={styles.button} onClick={() => navigate('/listtodos')}>List All Todos</button>
        <button className={styles.button} onClick={handleSummarizeTodos}>Summarize Todos and Send to Slack</button>
      </div>

      {summaryData.summary && (
        <div className={styles.summaryBox}>
          <h3>Summary</h3>
          <p>{summaryData.summary}</p>
          <p><strong>Status:</strong> {summaryData.slackStatus}</p>
        </div>
      )}

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h2>Create Todo</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="Enter todo title"
            />
            <div className={styles.popupButtons}>
              <button onClick={handleCreateTodo} className={styles.popupButton}>OK</button>
              <button onClick={() => setShowPopup(false)} className={styles.popupButtonCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default Home