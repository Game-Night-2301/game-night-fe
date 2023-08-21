import { searchGames, addOwnedGame } from '../../../queries';
import { useEffect, useState, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/actions';
import Button from '../../ReusableComponents/Button/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import GameResult from '../GameResult/GameResult';
import './GameModal.css';

const GameModal = ({ updateUser, onClose }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const client = useApolloClient();
  const [user, assignUser] = useSelector((state) => [state.user, state.user]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch(setUser(user));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setError(false)
    setLoading(true)
    try {
      const { data } = await client.query({
        query: searchGames,
        variables: { term: searchTerm },
      });
      const sortedSearchResults = data.gameSearch.slice().sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name === b.name) return 0;
        return 1;
      });
      setLoading(false)
      setSearchResults(sortedSearchResults);
    } catch (error) {
      setError(true);
    }
  };


  const handleAddGame = async (selectedGame) => {
    try {
      const { data } = await client.mutate({
        mutation: addOwnedGame,
        variables: {
          input: { 
            userId: Number(user.id), 
            gameId: Number(selectedGame)
          }
        }
      });
      await updateUser(Number(user.id));
    } catch (error) {
      setError(true)
    }
  }
  
  const isInCollection = (gameId) => {
    return user.ownedGames.some((game) => game.id === gameId);
  };

  const searchResultsPopulated = searchResults && searchResults.length && !loading;
  const noResults = searchResults && !searchResults.length;

  if (error) return (
    <div className="game-modal form" ref={modalRef}>
      <div className="game-modal-content container">
        <h2 className="form-header">Search for a Game</h2>
        <div className="line"></div>
        <div className="game-modal-body game-details">
          <TextField
            id="game-search"
            label="Search for a game by title"
            sx={{ marginTop: '1em', width: '100%' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="button-wrapper" >
            <Button onClick={handleSearchSubmit} className="game-modal-btn" text="Submit"/>
          </div>
          <Box className="game-results">
            <p className="result-error">No games were found in the database matching your search term. Please review your entry for typos and try searching again.</p>
          </Box>
        </div>
      </div>
    </div>
  );

  return (
    <div className="game-modal form" ref={modalRef}>
      <div className="game-modal-content container">
        <h2 className="form-header">Search for a Game</h2>
        <div className="line"></div>
        <div className="game-modal-body game-details">
          <TextField
            id="game-search"
            label="Search for a game by title"
            sx={{ marginTop: '1em', width: '100%' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="button-wrapper" >
            <Button onClick={handleSearchSubmit} className="game-modal-btn" text="Submit"/>
          </div>
          {loading && <section className="loader-container"><div className="loader"></div></section>}
          {searchResultsPopulated && (
            <Box className="game-results">
              {searchResults.map((game) => {
                return (
                  <GameResult
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    isInCollection={isInCollection(game.id)}
                    handleAddGame={handleAddGame}
                  />
                );
              })}
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModal;