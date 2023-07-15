import React, { useState, useEffect, useRef } from 'react';
import './AIRecs.css'
import BrowserHeader from '../../ReusableComponents/BrowserHeader/BrowserHeader';
import { Collapse, Box } from '@mui/material';
import Button from '../../ReusableComponents/Button/Button';

const AIRecs = ({handleRecSubmit, data}) => {
  const [loading, setLoading] = useState(false);
  const [received, setReceived] = useState(true);
  const [requested, setRequested] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (loading) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [loading]);

  const handleRequestButtonClick = () => {
    setRequested(true);
    setLoading(true);
    handleRecSubmit();
  };

  const handleRefreshButtonClick = () => {
    // clear to just allow them to click the button again - mostly designed to prevent too many requests
    setReceived(false);
    setRequested(false);
  };

  return (
    <section className="ai-recs-section">
      <BrowserHeader text="Request Personalized Game Recommendations"/>
      <section className={`ai-recs-panel recommend-me-panel card ${requested ? 'panel-collapsed' : ''}`}>
        <div className="ai-recs-number-wrapper">
          <p className="ai-recs-header-number">1</p>
        </div>
        <Collapse in={!requested} timeout="auto">
          <div className={`ai-recs-body ${requested ? 'hidden' : ''}`}>
            <div className="ai-body-text">
              <h4 className="ai-recs-header">Request Your Recommendations</h4>
              <p className="ai-recs-text">We'll use your existing game collection to build a personalized recommendations list informed by what you're already drawn to in games and what we think you might enjoy.</p>
            </div>
            <Button text="Go" className="ai-submit" onClick={() => setLoading(true)} />
          </div>
        </Collapse>
        <Collapse in={requested} timeout="auto">
        <h4 className="ai-recs-header collapsed-header">Request</h4>
        </Collapse>
      </section>
      <section className={`ai-recs-panel process-panel card ${!loading ? 'panel-collapsed' : ''}`}>
        <div className="ai-recs-number-wrapper">
          <p className="ai-recs-header-number">2</p>
        </div>
        <Collapse in={loading} timeout="auto">
          <div className={`ai-recs-body process-body ${!loading ? 'hidden' : ''}`}>
            <div className="ai-body-text">
              <h4 className="ai-recs-header">Processing</h4>
              <p className="ai-recs-text">Hold onto your ass while we crunch this data. If it takes longer than anticipated someone will be fired.</p>
            </div>
            <div className="time-wrapper">
              <Box className="time-box">
                <p className="timer-label">Estimated Wait: 10s</p>
              </Box>
              <Box className="time-box pulse">
                <p className="timer-label">Actual: {elapsedTime}s</p>
              </Box>
            </div>
          </div>
        </Collapse>
        <Collapse in={!loading} timeout="auto">
          <h4 className="ai-recs-header collapsed-header">Processing</h4>
        </Collapse>
      </section>
      <section className={`ai-recs-panel results-panel card ${!received ? 'panel-collapsed' : ''}`}>
        <div className="ai-recs-number-wrapper">
          <p className="ai-recs-header-number">3</p>
        </div>
        <Collapse in={received} timeout="auto">
          <div className={`ai-recs-body results-body ${!received ? 'hidden' : ''}`}>
            <div className="ai-body-text">
              <h4 className="ai-recs-header">Recommendation Results</h4>
              <p className="ai-recs-text">A team of scientists has been working day and night to create your recommendations. We think you're going to like the results - go take a look.</p>
            </div>
            <Button text="Again" className="ai-submit" onClick={() => setLoading(true)} />
          </div>
        </Collapse>
        <Collapse in={!received} timeout="auto">
          <h4 className="ai-recs-header collapsed-header">Results</h4>
        </Collapse>
      </section>
    </section>

  )
}

export default AIRecs;