import React, { useEffect } from 'react';
import { CreateNewList } from '../common/CreateNewList';
import { RootState } from '../../redux/index';
import { Button } from '../ui/button';
import { Download, Ellipsis } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Lists: React.FC = () => {

    const investorLists = useSelector((state: RootState) => state.list.investorLists);
    const [lists, setLists] = React.useState([]);
    const navigate = useNavigate();

    const openList = (id: any) => {
        navigate(`/lists/${id}`);
    }

    useEffect(() => {
        setLists(investorLists);
        console.log('investorLists', investorLists);
    }, [investorLists]);

    return (
        <div className='flex flex-col w-11/12 mx-auto my-8'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>My Saved Lists</h1>
                <CreateNewList />
            </div>
            <div className='flex gap-4 mt-6 flex-wrap justify-between'>
                {lists.map((list: any) => (
                    <div className='rounded-[5px] p-4 w-96 border-[0.5px] mb-4 border-gray-500' key={list._id}>
                        <div className='text-lg font-bold my-2 hover:underline hover:cursor-pointer' onClick={() => openList(list._id)}>{list.name}</div>
                        <p className='text-sm text-gray-400 font-semibold'>{list.desc}</p>
                        <div className='flex gap-3 mx-auto my-2'>
                            <Button variant="outline" className='mt-4 w-3/4 text-center rounded-[5px]'>
                                <div>
                                    Download CSV
                                    <Download className='ml-2 inline-block size-4' />
                                </div>
                            </Button>
                            <Button variant="outline" className='mt-4 rounded-[5px]'><Ellipsis /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Lists;