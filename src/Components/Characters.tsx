import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';

interface Results {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

type Str = string;
type Nmbr = number;
type Err = string | null;

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Results[]>([]);
  const [name, setName] = useState<Str>('');
  const [gender, setGender] = useState<Str>('');
  const [status, setStatus] = useState<Str>('');
  const [page, setPage] = useState<Nmbr>(1);
  const [pages, setPages] = useState<Nmbr>(1);
  const [next, setNext] = useState<Str>('');
  const [prev, setPrev] = useState<Str>('');
  const [error, setError] = useState<Err>(null);

  const fetchCharacters = (url: Str) => {
    axios
      .get(url)
      .then(({ data }) => {
        setCharacters(data.results);
        setNext(data.info.next);
        setPrev(data.info.prev);
        setPages(data.info.pages);
        setError(null);
      })
      .catch((err) => setError('Characters not found'));
  };

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${name}&gender=${gender}&status=${status}`;
    fetchCharacters(url);
  }, [name, gender, status, page]);

  const handlePageChange = (newPage: Nmbr) => setPage(newPage);

  const handleGenderChange = (newGender: Str) => {
    setGender(newGender);
    setPage(1);
  };

  const handleStatusChange = (newStatus: Str) => {
    setStatus(newStatus);
    setPage(1);
  };

  return (
    <div className='flex min-h-screen bg-black justify-center pb-10'>
      <div className='w-4/6 bg-white rounded-b-md shadow-lg p-5'>
        <div className='mb-4'>
          <input
            className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-600'
            onChange={(e) => setName(e.target.value)}
            placeholder='Search by name...'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-medium mb-2'>Gender</label>
          <div className='flex space-x-2'>
            <button
              className={`px-4 py-2 rounded ${gender === 'Male' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleGenderChange('Male')}
            >
              Male
            </button>
            <button
              className={`px-4 py-2 rounded ${gender === 'Female' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleGenderChange('Female')}
            >
              Female
            </button>
            <button
              className={`px-4 py-2 rounded ${gender === 'Genderless' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleGenderChange('Genderless')}
            >
              Genderless
            </button>
            <button
              className={`px-4 py-2 rounded ${gender === 'unknown' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleGenderChange('unknown')}
            >
              Unknown
            </button>
          </div>
          <div className='mb-4'>
          <label className='block text-lg font-medium mb-2'>Status</label>
          <div className='flex space-x-2'>
            <button
              className={`px-4 py-2 rounded ${status === 'Alive' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleStatusChange('Alive')}
            >
              Alive
            </button>
            <button
              className={`px-4 py-2 rounded ${status === 'Dead' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleStatusChange('Dead')}
            >
              Dead
            </button>
            <button
              className={`px-4 py-2 rounded ${status === 'unknown' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleStatusChange('unknown')}
            >
              unknown
            </button>
          </div>
        </div>
        <div className='mb-4'>
          <Pagination
            prev={prev}
            next={next}
            pages={pages}
            page={page}
            paginate={handlePageChange}
          />
        </div>
        <ul>
          {characters.map((character) => (
            <li key={character.id} className='flex items-center mb-4 p-4 border-b border-gray-200'>
              <img src={character.image} className='w-16 h-16 rounded-full mr-4' alt='avatar' />
              <div>
                <div className='text-lg font-semibold'>{character.name}</div>
                <div className='text-gray-600'>{character.species} - {character.gender}</div>
                <div className='text-gray-600'>{character.status}</div>
              </div>
            </li>
          ))}
          {error ? <p className='text-red-500'>{error}</p> : null}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Characters;