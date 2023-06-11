import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../hooks/hooks";
import { logOut } from "../../../store/user/auth.slice";
import { logout } from "../../../store/user/actions/auth.actions";
import useUserDetails from "../../../hooks/useUserDetails";

const Profile: FC = () => {
    const { userDetails } = useUserDetails()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onLogout = async () => {
        if (window.confirm('Are you really want to logout?')) {
            navigate('/')
            dispatch(logOut())
            await dispatch(logout())
        }
    }

    const onBack = () => navigate(-1)

    return (
        <div className="profile">
            <div className="profile-content">
                <p>Logged in as { userDetails.name } { userDetails.surname } ({userDetails.email})</p>
                <div>
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                    <button className="back-button" onClick={onBack}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default Profile