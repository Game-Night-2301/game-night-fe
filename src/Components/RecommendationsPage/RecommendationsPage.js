import React, { useState } from 'react';
import './RecommendationsPage.css'
import { useQuery, useMutation } from '@apollo/client';
// import { requestRecommendationMutation } from '../../../queries';
import { getUserGames } from '../../queries/index';
import Header from '../ReusableComponents/Header/Header';
import AIRecs from './AIRecs/AIRecs';
import RecOutput from './RecOutput/RecOutput';

const RecommendationsPage = ({ logoutUser, selectedUser }) => {
  const [received, setReceived] = useState(false);
  const { loading, error, data } = useQuery(getUserGames, { variables: { id: selectedUser } });

  
  const handleRecSubmit = () => {
    const userGamesArray = data.user.ownedGames;

    // do mutation and pass in array
    // pass data to RecOutput
    // pass loading, data to AIRecs to progress through form collapsibles
    // when data is received setReceived to true so that the results bit will pop up.
  };

  return (
    <>
      <Header logoutUser={logoutUser}/>
      <section className="profile-page recs-page">
        <AIRecs handleRecSubmit={handleRecSubmit} received={received}/>
        <RecOutput />
      </section>
    </>
  )
}

export default RecommendationsPage;