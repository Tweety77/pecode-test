import { useState } from 'react';
import Pagination from './Pagination';
import { gql, request } from 'graphql-request';
import { useQuery } from "react-query";
const locationImage = require('../img/location-placeholder.jpg');
const crossIcon = require('../img/cross-icon.png');

interface LocationInfo {
  next: string | null;
  prev: string | null;
  pages: number;
}

interface Resident {
  id: number;
  name: string;
  image: string;
}

interface LocationResult {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
}

interface QueryResult {
  locations: {
    info: LocationInfo;
    results: LocationResult[];
  };
}

type Nmbr = number;

const QUERY = (page: Nmbr) => gql`
  query {
    locations(page: ${page}) {
      info {
        next
        prev
        pages
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
    }
  }
`;

const Locations: React.FC = () => {
  const [page, setPage] = useState<Nmbr>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
  
  const popVisibility = () => setIsOpen((prevState) => !prevState);

  const handleShowMore = () => setShowAll(true);

  const handleShowLess = () => setShowAll(false);

  const { data } = useQuery<QueryResult>(["launches", page], () => {
    return request('https://rickandmortyapi.com/graphql', QUERY(page));
  });

  const handlePageChange = (newPage: Nmbr) => setPage(newPage);

  const handleLocationClick = (location: LocationResult) => {
    setSelectedLocation(location);
    popVisibility();
  };

  return (
    <div className='flex min-h-screen bg-black justify-center pb-10'>
      <div className='w-4/6 bg-white rounded-b-md shadow-lg p-5'>
        <div className='p-4'>
          <Pagination
            prev={data?.locations.info.prev ?? null}
            next={data?.locations.info.next ?? null}
            pages={data?.locations.info.pages ?? 1}
            page={page}
            paginate={handlePageChange}
          />
        </div>
        {isOpen && selectedLocation && (
          <div className='fixed bg-white mx-auto w-2/3 top-1/5 rounded border shadow text-lg pb-4'>
            <div className='flex justify-between items-center border-b pl-1'>
              <b>{selectedLocation.name}</b>
              <img
                className='size-10 m-1 rounded-full cursor-pointer'
                onClick={popVisibility}
                src={crossIcon}
                alt='Cancel'
              />
            </div>
            <div className='flex p-4'>
              <img className='h-48 m-1' src={locationImage} alt='avatar' />
              <div className='ml-4'>
                <div><b>Type:</b> {selectedLocation.type}</div>
                <div><b>Dimension:</b> {selectedLocation.dimension}</div>
                <ul className='flex flex-wrap mt-4'>
                  {selectedLocation.residents.slice(0, showAll ? selectedLocation.residents.length : 3).map((resident) => (
                    <li key={resident.id} className='flex mb-3 text-lg items-center w-1/3'>
                      <img src={resident.image} className='size-10 rounded-full' alt='avatar' />
                      <div className='font-bold ml-2'>{resident.name}</div>
                    </li>
                  ))}
                </ul>
                {selectedLocation.residents.length > 3 && (
                  showAll ? (
                    <button className='text-blue-500' onClick={handleShowLess}>Show Less</button>
                  ) : (
                    <button className='text-blue-500' onClick={handleShowMore}>Show More</button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        <ul className='p-4'>
          {data?.locations.results.map((location) => (
            <li
              key={location.id}
              className='flex mb-3 text-lg cursor-pointer border-b border-gray-200'
              onClick={() => handleLocationClick(location)}
            >
              <img src={locationImage} className='h-28 m-1' alt='avatar' />
              <div className='flex flex-col ml-4'>
                <div className='content-center font-bold'>{location.name}</div>
                <div>{location.type}</div>
                <div>{location.dimension}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Locations;