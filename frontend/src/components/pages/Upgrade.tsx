import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
import { upgradeUsingStripe } from '@/services/operation/profileAPI';

const List: React.FC = () => {
    const email = useSelector((state: RootState) => state.profile.user?.email);
    console.log("email: ", email);

    const makePayments = (membership: string) => {
        upgradeUsingStripe(email, membership);
    }

    return (
        <div className='flex flex-col w-11/12 mx-auto my-8 gap-4'>
            <button title='silver' onClick={() => makePayments("silver")}>silver membership</button>
            <button title='gold' onClick={() => makePayments("gold")}>gold membership</button>
        </div>
    )
}

export default List;