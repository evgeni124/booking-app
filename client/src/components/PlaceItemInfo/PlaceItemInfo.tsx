import { FC, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import { useNavigate, useParams } from "react-router-dom";
import locationImg from '../../assets/images/location.png';
import calendaryImg from '../../assets/images/calendar.png';
import { axiosInstance } from "../../api/axios";
import PlaceService from "../../services/place/place.service";
import { IPlace } from "../../types";
import useAuth from "../../hooks/useAuth";

const PlaceItemInfo: FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    // const [checkInValue, setCheckInValue] = useState(new Date())
    const [place, setPlace] = useState<IPlace>({
        id: -1,
        description: '',
        images: [],
        numberGuests: null,
        price: null,
        title: '',
    })

    const onBook = () => {
        if (!isAuth) {
            navigate('/login')
        }
    }

    useEffect(() => {
        const fetchOnePlace = async () => {
            try {
                const id = params.id

                if (id) {
                    const response = await PlaceService.getOnePlace(id)
                    console.log(response);
                    const place = response.data.place
                    setPlace({...place})
                }

            } catch (error) {
              console.log(error);
            } 
        }

        fetchOnePlace()
    }, [])

    // console.log(checkInValue);

    return (
        <div className="placeItemInfo-container">
            <div className="placeItemInfo-container__content">
                <div className="placeItemInfo-container__content__info">
                    <h2 className="title">Breathtaking Mountain views in cozy Birdbox</h2>
                    <div className="location">
                        <img src={locationImg} alt="location" />
                        <p>Fjordane, Norway</p>
                    </div>
                    <div className="images">
                        <img src='http://localhost:4800/images/place-img.webp' alt="img" />
                    </div>
                    <div className="more-details">
                        <div className="description">
                            <h3>Description</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam nemo sapiente nisi ratione saepe repellendus ex numquam debitis, nihil perspiciatis distinctio, commodi consequatur. Ullam ea praesentium ratione adipisci eaque delectus.
                            Architecto aspernatur quidem doloribus error atque autem nam molestiae. At accusantium aspernatur, ipsa quisquam maxime minima magni totam ea incidunt temporibus itaque dicta nihil optio eveniet alias ut quibusdam. Libero?</p>
                            <p>Max number of guests 2</p>
                        </div>
                        <div className="booking">
                            <h3>Price: ${place.price} / per night</h3>
                            <div className="booking-content">
                                <div>
                                    Check in:
                                    <img src={calendaryImg} style={{cursor: 'pointer'}} alt="calendar" />
                                    {/* <Calendar
                                        onChange={(e) => setCheckInValue(e as any)}
                                        value={checkInValue}
                                    /> */}
                                </div>
                                <div>
                                    Check out:
                                    <img src={calendaryImg} style={{cursor: 'pointer'}} alt="calendar" />
                                </div>
                            </div>
                            <button className="book-button" onClick={onBook}>Book this place</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceItemInfo