import { FC } from "react";
import { Link } from "react-router-dom";
import userAvatar from "../../../assets/images/user.png";
import useAuth from "../../../hooks/useAuth";
import useUserDetails from "../../../hooks/useUserDetails";
// const avatarImagePath = 'http://localhost:4800/images/user.png'

const Header: FC = () => {
    const { isAuth } = useAuth()
    const { userDetails } = useUserDetails()

    return (
        <header className="header-container">
            <div className="header-container__content">
                <div className="header-container__content__left">
                    <Link to="/" className="link">
                        <h2>Logo</h2>
                    </Link>
                </div>

                <div className="header-container__content__right">
                    {
                        (isAuth) ? 
                            <Link to='/user' className="link">
                                <div className="content-login">
                                    <img className="avatar-img" src={userAvatar} alt="avatar"/>
                                    <h3>{ userDetails.name && userDetails.name} { userDetails.surname && userDetails.surname }</h3>
                                </div>
                            </Link>
                            :
                            <Link to='/login' className="link">
                                <div className="content-logout">
                                    <img className="avatar-img" src={userAvatar} alt="avatar"/>
                                    <button className="login-button">Войти</button>
                                </div>
                            </Link>
                    }
                </div>

            </div>
        </header>
    )
}

export default Header;