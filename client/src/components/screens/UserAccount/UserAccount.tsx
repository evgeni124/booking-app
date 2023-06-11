import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const UserAccount: FC = () => {
    return (
        <div className="user-info__container">
            <div className="user-info__container__content">
                <div>
                    <Link to='/user/profile'> <button>My profile</button> </Link>
                </div>
                <div>
                    <Link to='/user/bookings'> <button>Bookings</button> </Link>
                </div>
                <div>
                    <Link to='/user/accomodations'><button>My accomodations</button></Link>
                </div>
            </div>
        </div>
    )
}

export default UserAccount