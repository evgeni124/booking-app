import { FC, useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { FormData, IErrorsValidation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { login } from "../../../store/user/actions/auth.actions";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";
import InputField from "../UI/Input/InputField";
import useAuth from "../../../hooks/useAuth";

const AuthForm: FC = () => {
    const { isAuth } = useAuth()
    const [errorsValidation, setErrors] = useState<any[]>([])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            email: 'evgeni@gmail.com',
            password: '12345'
        }
    })
    const { pathName } = useCurrentLocation()
    const isLoginPath = pathName === '/login'
    
    const onSubmit = async (data: FormData) => {
        if (isLoginPath) {
            const result = await dispatch(login(data)) 
            console.log(result)
            // const arrayWithErrors = result.payload as IErrorsValidation
            // // console.log(arrayWithErrors.errors)
            // setErrors(arrayWithErrors.errors)
        } else {
                // axios.post('/register')
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    return (
        <div className="auth-container">
                    <div className="auth-container__content">
                        <h1>{ isLoginPath ? 'Login' : 'Register' }</h1>
                        <div className="form-container">
                            <form method="post" className="form-content" onSubmit={handleSubmit(onSubmit)}>
                                {
                                    isLoginPath ? 
                                        <>
                                                <div>
                                                    <InputField {...register('email')} 
                                                        className="form-input" 
                                                        type="email" 
                                                        name="email" 
                                                        placeholder="your@gmail.com"
                                                    />
                                                </div>

                                                <div>
                                                    <InputField {...register('password')} 
                                                        className="form-input" 
                                                        type="password"
                                                        name="password" 
                                                        placeholder="your password"
                                                    />
                                                </div>
                                        </>
                                        :
                                        <>
                                            <InputField {...register('name')} className="form-input" type="text" name="name" placeholder="your name"/>
                                            <InputField {...register('surname')} className="form-input" type="text" name="surname" placeholder="your surname"/>
                                            <InputField {...register('email')} className="form-input" type="email" name="email" placeholder="your email"/>
                                            <InputField {...register('password')} className="form-input" type="password" name="password" placeholder="your password"/>
                                        </>
                                }
                                <button type="submit">{ isLoginPath ? 'Login' : 'Register' }</button>
                            </form>
                        </div>
                        <p>
                            { isLoginPath ? 
                                <>
                                    Don't have an account? <Link to="/register">Register now</Link>
                                </>
                                :
                                <>
                                Already signed up? <Link to="/login">Login now</Link>
                                </>
                            }
                        </p>
                    </div>
        </div>
    )
}

export default AuthForm