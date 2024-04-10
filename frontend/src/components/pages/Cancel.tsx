import React from 'react';

const Cancel: React.FC = () => {
    return (
        <div className='flex flex-col w-11/12 mx-auto my-8 gap-4'>
            <h1 className='text-2xl font-bold'>Payment Cancelled</h1>
            <p className='text-xl'>Your payment has been cancelled. Please try again.</p>
        </div>
    )
}

export default Cancel;