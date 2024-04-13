import { RootState } from '@/redux';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mastercardImage from '../../assets/mastercard.png';
import visaImage from '../../assets/visa.png';
import amexImage from '../../assets/amex.png';
import debitImage from '../../assets/debit.jpeg';

const Billing: React.FC = () => {
    const user = useSelector((state: RootState) => state.profile.user);
    console.log("user from billing: ", user)
    const navigate = useNavigate();

    const date = new Date(user.invoice.dateCreated);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const cardImage = () => {
        if (user.invoice.card_brand === 'visa') return visaImage;
        else if (user.invoice.card_brand === 'mastercard') return mastercardImage;
        else if (user.invoice.card_brand === 'amex') return amexImage;
        return debitImage;
    }

    return (
        <div className='flex'>
            <div className='flex flex-col justify-between h-[calc(100vh-3.5rem)] w-1/3 bg-black text-white p-5'>
                <div className='mt-16'>
                    <div className='text-xl font-semibold mb-4'>Manage your GetFunded billing settings</div>
                    <div className='text-sm text-gray-500 hover:cursor-pointer hover:underline hover:text-gray-400' onClick={() => navigate("/dashboard/investors")}><ArrowLeft className='inline-block' /> Return to Investors page</div>
                </div>
                <div>
                    <span className='text-sm text-gray-500'>Powered by</span>
                    <span className='text-xl font-bold mx-2'>stripe</span>
                    <span className='text-gray-500'>|</span>
                    <span className='text-sm text-gray-500 ml-2'>Privacy</span>
                </div>
            </div>
            {user.invoice.membership ?
                (<div className='w-2/3 bg-white h-[calc(100vh-3.5rem)] px-12 py-4 flex flex-col gap-y-16 justify-between'>
                    <div className='mt-2 flex flex-col gap-y-2'>
                        <div className='text-gray-600 font-semibold'>PAYMENT METHODS</div>
                        <div className='border-b-[0.5px] border-gray-300'></div>
                        <div className='text-gray-800 font-medium first-letter:capitalize flex gap-10'>
                            <div>
                                {/* <img src='https://as2.ftcdn.net/v2/jpg/01/80/07/07/1000_F_180070701_IJQ2cZgkGdEVo50lz7l00slMDVLJvho4.jpg' alt='card' className='w-10 inline-block mr-2' /> */}
                                <img src={cardImage()} alt='card' className='w-[30px] rounded h-[30px] inline-block mr-2' />
                                {user.invoice.card_brand}
                                <span className='text-gray-500 mx-2'>....</span>
                                {user.invoice.card_last4}
                            </div>
                            <div>Expires {user.invoice.card_exp_month}/{user.invoice.card_exp_year}</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <div className='text-gray-600 font-semibold'>BILLING INFORMATION</div>
                        <div className='border-b-[0.5px] border-gray-300'></div>
                        {/* table representation for name and billing address */}
                        <table className='w-2/3'>
                            <tr style={{ height: '60px' }}>
                                <td className='text-gray-500 font-medium'>Name</td>
                                <td className='text-gray-800 font-medium'>{user.invoice.name}</td>
                            </tr>
                            <tr>
                                <td className='text-gray-500 font-medium ' style={{ width: '30%', verticalAlign: 'top' }}>Billing Address</td>
                                <td className='text-gray-800 font-medium'>
                                    <div>{`${user.invoice.address_line1 ? user.invoice.address_line1 : ""}`}</div>
                                    <div>{`${user.invoice.address_line2 ? user.invoice.address_line2 : ""}`}</div>
                                    <div>{`${user.invoice.address_city ? user.invoice.address_city : ""}, ${user.invoice.address_postal_code ? user.invoice.address_postal_code : ""}`}</div>
                                    <div>{`${user?.invoice.address_state ? user.invoice.address_state : ""}`}</div>
                                    <div>{`${user.invoice.address_country ? user.invoice.address_country : ""}`}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <div className='text-gray-600 font-semibold'>INVOICE HISTORY</div>
                        <div className='border-b-[0.5px] border-gray-300'></div>
                        <div className='flex justify-between gap-3 text-gray-800 font-semibold'>
                            <div>{formattedDate}</div>
                            <div>{`${user.invoice.currency === 'usd' ? "US $" : `${user.invoice.currency} `}${user.invoice.amount}`}</div>
                            <div className='rounded-[5px] bg-green-300 text-green-600 p-1'>paid</div>
                            <div>{`GetFunded ${user.invoice.membership === 'gold' ? "Gold" : "Silver"} Subscription`}</div>
                        </div>
                    </div>
                    <div></div>
                </div>) : (
                    <div className='w-2/3 bg-white h-[calc(100vh-3.5rem)] text-gray-800 flex justify-center items-center  font-semibold'>
                        You Don't Have Any Invoice. <span className='text-blue-500 ml-4 hover:underline hover:cursor-pointer' onClick={() => navigate("/dashboard/upgrade")}>Upgrade Now</span>
                    </div>
                )
            }
        </div>
    );
};

export default Billing;
