import { RootState } from '../../redux/index';
import { paymentSuccess } from '@/services/operation/profileAPI';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Success: React.FC = () => {
    const email = useSelector((state: RootState) => state.profile.user?.email);
    const dispatch = useDispatch();
    // const { session_id } = useParams();
    // const sessionId = session_id ? session_id : "free";
    const location = useLocation();
    const session_id = new URLSearchParams(location.search).get('session_id');
    const sessionId = session_id ? session_id : "free";

    useEffect(() => {
        paymentSuccess(email, sessionId, dispatch);
    }, []);
    return (
        <div className='flex flex-col w-11/12 mx-auto my-8 gap-4'>
            <h1 className='text-2xl font-bold'>Payment Successful</h1>
            <p className='text-xl'>Thank you for your payment. Your membership has been upgraded.</p>
        </div>
    )
}

export default Success;