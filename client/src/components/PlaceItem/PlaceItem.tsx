import { FC } from 'react';
import classes from './PlaceItem.module.scss';
import { IPlace } from '../../types';
import { useNavigate } from 'react-router-dom';

interface IPlaceItemProps {
    place: IPlace,
}

const PlaceItem: FC<IPlaceItemProps> = ({ place }) => {
    const navigate = useNavigate()

    const onPlaceItemInfo = (placeItemId: number) => navigate(`/placeItemInfo/${placeItemId}`)
    
    return (
        <article className='place-item' onClick={() => onPlaceItemInfo(place.id)}>
            <div className='place-item__content'>
                <div className='place-item__content__img'>
                    <img 
                        className='img'
                        src='http://localhost:4800/images/place-img.webp'
                        alt="place-img"
                    />
                </div>
                <div className='place-item__content__info'>
                    <h1>{place.title}</h1>
                    <div>$<span>{place.price}</span> per night</div>
                </div>
            </div>
        </article>
    )
}

export default PlaceItem;