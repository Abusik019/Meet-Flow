import styles from './style.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signIn } from '../../store/slices/authSlice';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import Registration from '../../components/layouts/registration';
import { GoogleLoginBtn } from '../../components/common/googleLoginBtn';

import meetImg from "../../assets/images/login.jpg";
import logoImg from "../../assets/images/logo.png";
import yandexImg from "../../assets/icons/yandex.png";

type Props = {};

export default function Authorization({}: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useSelector((state: RootState) => state.authSlice.error);

    const   [username, setUsername] = useState<string>(''), 
            [password, setPassword] = useState<string>(''),
            [isLoginPage, setIsLoginPage] = useState<boolean>(true),
            [isLoading, setIsLoading] = useState<boolean>(false);

    const isDisabled = Boolean(username && password);

    async function fetchSignIn(): Promise<void> {
        try {
            setIsLoading(true);
            if (!username || !password) {
                throw new Error("Username and password are required");
            }

            const action = await dispatch(
                signIn({
                    username,
                    password,
                })
            );

            if (signIn.fulfilled.match(action)) {
                navigate("/");
            }
        } catch (error: any) { 
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-[100vh] p-8 box-border flex items-center gap-5">
            {isLoginPage ? (
                <div className="w-[50%] h-full border border-[#eaeaea] rounded-xl flex items-center justify-center px-8 py-5 box-border">
                    <div className='w-[50%] flex flex-col items-center'>
                        <img className="mt-16" src={logoImg} width={64} height={64} alt="logo" />
                        <h2 className="text-2xl font-medium">Welcome back!</h2>
                        <p className="text-[#00000060]">Enter email & password to continue</p>
                        <form 
                            className="w-full mt-6 flex flex-col items-center gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                fetchSignIn();
                            }}
                        >
                            <input className={styles.username} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} type="text" placeholder="Enter your username" required/>
                            <input className={styles.password} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required/>
                            {error && (
                                <div className="text-red-500 text-sm mt-2 border border-red-500 rounded-lg w-full p-2 box-border">
                                    {error}
                                </div>
                            )}
                            <button 
                                type='submit' 
                                disabled={!isDisabled || isLoading} 
                                className={classnames('mt-8 w-full bg-black py-3 box-border text-center rounded-xl text-white font-medium cursor-pointer',{
                                    'opacity-20': !isDisabled,
                                    'opacity-100': isDisabled,
                                })}
                            >
                                {isLoading ? "Loading..." : "Sign in"}
                            </button>
                        </form>
                        <div className='w-full mt-5 flex items-center justify-center gap-3'>
                            <div className='w-[25%] h-[1px] bg-[#eaeaea]'></div>
                            <h2 className='text-[#00000080]'>Or sign in with</h2>
                            <div className='w-[25%] h-[1px] bg-[#eaeaea]'></div>
                        </div>
                        <div className='w-full mt-5 flex items-center justify-center gap-3'>
                            <GoogleLoginBtn />
                            <Link to="#" className='w-[50%] py-2 box-border border border-[#eaeaea] flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-[#00000010]'>
                                <img src={yandexImg} width={24} height={24}  alt="yandex" />
                                <span className='font-medium'>Yandex</span>
                            </Link>
                        </div>
                        <h3 className='mt-12 text-[#00000080]'>Don't have an account?<button onClick={() => setIsLoginPage(false)} className='text-[#000] underline ml-1 font-medium cursor-pointer'>Create an account</button></h3>
                    </div>
                </div>
            ) : <Registration setIsLoginPage={setIsLoginPage} />}
            <div className="w-[50%] h-full bg-[#DDE4F7] p-5 box-border flex flex-col justify-end items-center rounded-xl">
                <h2 className="font-medium text-3xl mb-10">
                    Meet Flow: Streamline Your Workflow with Seamless
                    Collaboration
                </h2>
                <p className="text-white mb-9">
                    Meet Flow is a powerful tool designed for large companies to
                    streamline communication and productivity. It offers
                    seamless video calls, task planning, and real-time chats,
                    all in one place. With intuitive features, Meet Flow helps
                    teams stay connected, organized, and efficient, making
                    collaboration easier and more effective. Simplify your
                    workflow and enhance teamwork with Meet Flow.
                </p>
                <img src={meetImg} width={668} height={445} alt="meet" />
            </div>
        </div>
    );
}
