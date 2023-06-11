import { FC } from 'react';
import PlaceItem from '../../PlaceItem/PlaceItem';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../Loader/Loader';

const Home: FC = () => {
    const { data, isLoading, error } = useFetch()

    if (isLoading) {
        return <div style={{width: 1140, margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
            <Loader/>
        </div>
    }

    return (
        <main className="home-container">
            <div className="home-container__content">
                <div className='home-container__content__list'>
                    { (data.places.length > 0 && !isLoading) && data?.places?.map(place => <PlaceItem key={place.id} place={place}/>)}
                </div>
            </div>
        </main>
    )    
}

export default Home