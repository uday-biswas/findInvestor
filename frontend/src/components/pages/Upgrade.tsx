import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
import MembershipCard from '../common/MembershipCard';

const List: React.FC = () => {
    const user = useSelector((state: RootState) => state.profile.user);
    console.log("email from upgrade page: ", user.email);

    return (
        <div className='w-5/6 mx-auto pb-10 pt-5 flex flex-col gap-2 justify-around h-[calc(100vh-3.5rem)]'>
            <div>
                <div className='text-4xl font-extrabold text-center mb-3'>Upgrade your Plan</div>
                <div className='text-xl font-bold text-gray-600 text-center'>Current Plan : {`${user.membership === "free" ? "Free Member" : user.membership === "gold" ? "Gold Member" : "Silver Member"}`}</div>
            </div>
            <div className='flex justify-between gap-5 flex-wrap mt-10'>
                <MembershipCard membership="free" />
                <MembershipCard membership="silver" />
                <MembershipCard membership="gold" />
            </div>
        </div>
    )
}

export default List;