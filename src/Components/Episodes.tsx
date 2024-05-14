import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
const episodeImage = require('../img/episode-placeholder.jpg');
const crossIcon = require('../img/cross-icon.png');

type Results = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

interface Characters {
  id: number;
  name: string;
  image: string;
}

type Str = string;
type Nmbr = number;
type Err = string | null;

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Results[]>([]);
  const [page, setPage] = useState<Nmbr>(1);
  const [pages, setPages] = useState<Nmbr>(1);
  const [next, setNext] = useState<Str>('');
  const [prev, setPrev] = useState<Str>('');
  const [error, setError] = useState<Err>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<Str>('');
  const [airTime, setAirTime] = useState<Str>('');
  const [episode, setEpisode] = useState<Str>('');
  const [links, setLinks] = useState<Characters[]>([]);
  const [chars, setChars] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const popVisibility = () => setIsOpen((prevState) => !prevState);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const fetchEpisodes = (page: Nmbr) => {
    const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
    axios
      .get(url)
      .then(({ data }) => {
        setEpisodes(data.results);
        setNext(data.info.next);
        setPrev(data.info.prev);
        setPages(data.info.pages);
        setError(null);
      })
      .catch((err) => setError('Episodes not found'));
  };

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  const handlePageChange = (newPage: Nmbr) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function fetchLinks() {
      const requests = chars.map((character) => axios.get(character));
      try {
        const responses = await Promise.all(requests);
        const linksData = responses.map((response) => response.data);
        setLinks(linksData);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    }

    fetchLinks();
  }, [chars]);

  const episodesToShow = showAll ? links : links.slice(0, 3);

  return (
    <div className='flex min-h-screen bg-black justify-center pb-10'>
      <div className='w-4/6 bg-white rounded-b-md shadow-lg p-5'>
        <div className='p-4'>
          <Pagination prev={prev} next={next} pages={pages} page={page} paginate={handlePageChange} />
        </div>
        {isOpen && (
          <div className='fixed bg-white mx-auto w-2/3 top-1/5 rounded border shadow text-lg pb-4'>
            <div className='flex justify-between items-center border-b pl-2'>
              <b>{name}</b>
              <img
                className='size-10 m-1 rounded-full cursor-pointer'
                onClick={popVisibility}
                src={crossIcon}
                alt='Cancel'
              />
            </div>
            <div className='flex p-4'>
              <img className='h-48 m-1' src={episodeImage} alt='avatar' />
              <div className='ml-4'>
                <div><b>Episode:</b> {episode}</div>
                <div><b>Air Date:</b> {airTime}</div>
                <ul className='flex flex-wrap mt-4'>
                  {episodesToShow.map((character) => (
                    <li key={character.id} className='flex mb-3 text-lg items-center w-1/3'>
                      <img src={character.image} className='size-10 rounded-full' alt='avatar' />
                      <div className='font-bold ml-2'>{character.name}</div>
                    </li>
                  ))}
                </ul>
                {showAll ? (
                  <button className='text-blue-500' onClick={handleShowLess}>Show Less</button>
                ) : (
                  <button className='text-blue-500' onClick={handleShowMore}>Show More</button>
                )}
              </div>
            </div>
          </div>
        )}
        <ul className='p-4'>
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className='flex mb-3 text-lg cursor-pointer border-b border-gray-200'
              onClick={() => {
                popVisibility();
                setName(episode.name);
                setAirTime(episode.air_date);
                setEpisode(episode.episode);
                setChars(episode.characters);
              }}
            >
              <img src={episodeImage} className='h-28 m-1' alt='avatar' />
              <div className='flex flex-col ml-4'>
                <div className='content-center font-bold'>{episode.name}</div>
                <div>{episode.episode}</div>
                <div>{episode.air_date}</div>
              </div>
            </li>
          ))}
          {error ? <p className='text-red-500'>{error}</p> : null}
        </ul>
      </div>
    </div>
  );
};

export default Episodes;