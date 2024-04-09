import React, { useEffect, useState } from 'react';
import { CreateNewList } from '../common/CreateNewList';
import { RootState } from '../../redux/index';
import { Button } from '../ui/button';
import { Download, Ellipsis, PencilLine, Trash } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import UpdateList from '../common/UpdateList';
import DeleteList from '../common/DeleteList';

const Lists: React.FC = () => {

    const investorLists = useSelector((state: RootState) => state.list.investorLists);
    const [lists, setLists] = useState([]);
    const [editDetailsModal, setEditDetailsModal] = useState<{ [key: string]: boolean }>({});
    const [deleteOpen, setDeleteOpen] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    const openList = (id: any) => {
        navigate(`/dashboard/lists/${id}`);
    }

    useEffect(() => {
        setLists(investorLists);
        console.log('investorLists', investorLists);
    }, [investorLists]);

    const toggleEditModal = (id: string) => {
        setEditDetailsModal(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const toggleDeleteModal = (id: string) => {
        setDeleteOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    return (
        <div className='flex flex-col w-11/12 mx-auto my-8 h-[calc(100vh-16rem)]'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>My Saved Lists</h1>
                <CreateNewList />
            </div>
            {
                lists.length === 0 ? <div className="flex w-full min-h-full justify-center items-center font-semibold text-xl text-gray-500">No Lists found.</div> :
                    <div className='flex gap-4 mt-6 flex-wrap justify-around'>
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="outline" className='mt-4 rounded-[5px]'><Ellipsis /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={() => toggleEditModal(list._id)}>
                                                    <PencilLine className="mr-2 inline-block size-4" />
                                                    <span>Edit details</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <div onClick={() => toggleDeleteModal(list._id)} className="rounded-[5px] text-red-400 border-red-400">
                                                        <Trash className="mr-2 inline-block size-4" />
                                                        <span>Delete list</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    {editDetailsModal[list._id] && <UpdateList isOpen={editDetailsModal[list._id]} setIsOpen={setEditDetailsModal} list={list} />}
                                    {deleteOpen[list._id] && <DeleteList id={list._id} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} />}
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default Lists;