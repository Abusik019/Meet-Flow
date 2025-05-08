import { Link } from 'react-router-dom';

import NewIcon from '../../assets/NewIcon';
import PastIcon from '../../assets/PastIcon';
import lampImg from '../../assets/images/lamp.png';

type Props = {};

export default function SelectCanvas({}: Props) {
    return (
        <div style={{height: 'calc(100vh - 2rem)'}} className='w-full flex flex-col items-center justify-center gap-10'>
            <img src={lampImg} width={256} height={256} alt="lamp" />
            <div className='flex items-center gap-10'>
                <div className='w-[300px] flex items-center gap-3 bg-gray-100 border border-gray-200 p-5 box-border rounded-lg cursor-pointer transition-shadow hover:shadow-xl'>
                    <Link className='w-full h-full flex items-center gap-3' to='/canvas/past'>
                        <PastIcon />
                        <h2 className='text-xl'>Continue with existing</h2>
                    </Link>
                </div>
                <div className='w-[300px] bg-gray-100 border border-gray-200 p-5 box-border rounded-lg cursor-pointer transition-shadow hover:shadow-xl'>
                    <Link className='w-full h-full flex items-center gap-10' to='/canvas/new'>
                        <NewIcon />
                        <h2 className='text-xl'>Start a new</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}
