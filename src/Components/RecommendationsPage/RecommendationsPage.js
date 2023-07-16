import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './RecommendationsPage.css';
import { useLazyQuery } from '@apollo/client';
import { getUserRecommendations } from '../../queries/index';
import Header from '../ReusableComponents/Header/Header';
import AIRecs from './AIRecs/AIRecs';
import RecOutput from './RecOutput/RecOutput';
import PropTypes from 'prop-types'

const RecommendationsPage = ({ logoutUser, selectedUser }) => {
  const [dataReceived, setDataReceived] = useState(false);
  const [getUserRecs, { loading, data, error }] = useLazyQuery(
    getUserRecommendations,
    {
      onCompleted: () => {
        setDataReceived(true);
      },
    }
  );

  const handleRecSubmit = async () => {
    getUserRecs({ variables: { id: selectedUser } });
  };

  useEffect(() => {
    if (dataReceived) {
    }
  }, [dataReceived]);

  if (error) return <Redirect to="/error" />;

  return (
    <>
      <Header logoutUser={logoutUser} />
      <section className="profile-page recs-page">
        <AIRecs
          handleRecSubmit={handleRecSubmit}
          received={dataReceived}
          loading={loading}
          setDataReceived={setDataReceived}
        />
        <RecOutput recommendations={data} />
      </section>
    </>
  );
};

export default RecommendationsPage;

RecommendationsPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
};
