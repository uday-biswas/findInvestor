import { RootState } from '@/redux';
import { upgradeUsingStripe } from '@/services/operation/profileAPI';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MembershipProps {
    membership: string
}

const MembershipCard: React.FC<MembershipProps> = ({ membership }) => {

    const user = useSelector((state: RootState) => state.profile.user);
    const navigate = useNavigate();

    const makePayments = (membership: string) => {
        if (membership === "free") {
            navigate("/dashboard/investors");
            return;
        }
        upgradeUsingStripe(user.email, membership);
    }

    console.log("membership from membership card: ", membership);

    return (
        <div className='rounded-[10px] border-[0.5px] border-gray-600 p-10 gap-2 flex flex-col bg-gray-900'>
            <div className='text-gray-500 text-xl font-bold'>Plan Name</div>
            <div className='text-gray-100 text-2xl font-bold'>{membership === "free" ? "Free" : membership === "silver" ? "Silver" : "Gold"}</div>
            <div className='text-xl text-gray-600 mt-4'>Benefits</div>
            <div className='text-xl text-gray-300'>Get access to {`${membership === "free" ? "5,000" : membership === "silver" ? "30,000" : "90,000+"}`} Investors</div>
            <div className='text-xl text-gray-300'>350+ Pitchdecks</div>
            <div className='text-xl text-gray-300'>Lifetime Update</div>
            <div onClick={() => makePayments(membership)} className='mt-4 w-full rounded-[5px] bg-blue-500 text-gray-100 text-center text-xl font-semibold p-4 hover:bg-blue-600 hover:cursor-pointer'>{`${membership === "free" ? "Continue with Free Plan" : membership === "silver" ? "Select Silver Plan" : "Select Gold Plan"}`}</div>
        </div>
    )
}

export default MembershipCard;