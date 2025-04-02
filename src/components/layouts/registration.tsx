import styles from '../style.module.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import classnames from 'classnames';
import Uploader from '../common/uploader';

import logoImg from "../../assets/images/logo.png";
import yandexImg from "../../assets/icons/yandex.png";
import googleImg from "../../assets/icons/google.svg";

type Props = {
    setIsLoginPage: (value: boolean) => void;
};

export default function Registration({setIsLoginPage}: Props) {
    const   [username, setUsername] = useState<string | null>(''),
            [firstName, setFirstName] = useState<string | null>(''),
            [lastName, setLastName] = useState<string | null>(''),
            [email, setEmail] = useState<string | null>(''), 
            [password, setPassword] = useState<string | null>(''),
            [avatar, setAvatar] = useState<object | null>({});

    const isDisabled = Boolean(username && firstName && lastName && email && password);

    return (
        <div className="w-[50%] h-full border border-[#eaeaea] rounded-xl flex items-start justify-center px-8 py-5 box-border">
            <div className="w-[50%] h-full flex flex-col items-center justify-between">
                <img
                    src={logoImg}
                    width={64}
                    height={64}
                    alt="logo"
                />
                <div>
                    <form className="w-full mt-6 flex flex-col items-center gap-2">
                        <Uploader setAvatar={setAvatar}/>
                        <input
                            className={styles.username}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
                            }
                            type="text"
                            placeholder="Enter your username"
                            required
                        />
                        <div className='w-full flex items-center gap-1'>
                            <input
                                className="w-[50%] rounded-lg border border-[#eaeaea] shadow-xl py-3 px-2 box-border outline-none appearance-none"
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFirstName(e.target.value)
                                }
                                type="text"
                                placeholder="First Name"
                                required
                            />
                            <input
                                className="w-[50%] rounded-lg border border-[#eaeaea] shadow-xl py-3 px-2 box-border outline-none appearance-none"
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLastName(e.target.value)
                                }
                                type="text"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        <input
                            className={styles.email}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            type="email"
                            placeholder="Enter your email address"
                            required
                        />
                        <input
                            className={styles.password}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="submit"
                            disabled={!isDisabled}
                            className={classnames(
                                "mt-8 w-full bg-black py-3 box-border text-center rounded-xl text-white font-medium cursor-pointer",
                                {
                                    "opacity-20": !isDisabled,
                                    "opacity-100": isDisabled,
                                }
                            )}
                        >
                            Sign up
                        </button>
                    </form>
                    <div className="w-full mt-5 flex items-center justify-center gap-3">
                        <div className="w-[25%] h-[1px] bg-[#eaeaea]"></div>
                        <h2 className="text-[#00000080]">Or sign up with</h2>
                        <div className="w-[25%] h-[1px] bg-[#eaeaea]"></div>
                    </div>
                    <div className="w-full mt-5 flex items-center justify-center gap-3">
                        <Link
                            to="#"
                            className="w-[50%] py-2 box-border border border-[#eaeaea] flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-[#00000010]"
                        >
                            <img
                                src={googleImg}
                                width={24}
                                height={24}
                                alt="google"
                            />
                            <span className="font-medium">Google</span>
                        </Link>
                        <Link
                            to="#"
                            className="w-[50%] py-2 box-border border border-[#eaeaea] flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-[#00000010]"
                        >
                            <img
                                src={yandexImg}
                                width={24}
                                height={24}
                                alt="yandex"
                            />
                            <span className="font-medium">Yandex</span>
                        </Link>
                    </div>
                    <h3 className="mt-12 text-[#00000080]">
                        Already have an account?
                        <button
                            onClick={() => setIsLoginPage(true)}
                            className="text-[#000] underline ml-1 font-medium cursor-pointer"
                        >
                            Login to your account
                        </button>
                    </h3>
                </div>
            </div>
        </div>
    );
}
