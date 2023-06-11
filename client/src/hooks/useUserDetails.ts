import { useAppSelector } from "./hooks"


const useUserDetails = () => {
    const { user: userDetails } = useAppSelector(state => state.auth)

    return { userDetails }
}

export default useUserDetails