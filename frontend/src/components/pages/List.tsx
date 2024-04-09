import { ChevronLeft, PencilLine, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/index";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import InvestorCard from "../common/InvestorCard";
import DeleteList from "../common/DeleteList";

const List = () => {
    const investorLists = useSelector((state: RootState) => state.list.investorLists);
    const { id } = useParams<{ id: string }>();
    const [lists, setLists] = useState([]);
    const [list, setList] = useState<any>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLists(investorLists);
        console.log('investorLists', lists);
    }, [investorLists]);

    useEffect(() => {
        const selectedList = lists.find((list: any) => list._id === id);
        setList(selectedList);
        console.log('selectedList', selectedList);
    }, [id, lists]);

    if (!list) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-11/12 mx-auto mt-4 flex flex-col">
            <div onClick={() => navigate("/lists")} className="hover:underline hover:cursor-pointer"><ChevronLeft className="inline-block" /> <span>Back to Saved Lists</span></div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-semibold mt-4">{list.name}</div>
                    <div className="text-gray-500 font-medium">{list.desc}</div>
                </div>
                <div className="flex">
                    <Button className="mt-4 ml-4 rounded-[5px] font-semibold"><span>Edit details</span><PencilLine className="ml-2 inline-block size-4" /></Button>
                    <DeleteList id={list._id} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} />
                    <Button variant="outline" onClick={() => setDeleteOpen(true)} className="mt-4 ml-4 rounded-[5px] text-red-400 
                border-red-400 hover:text-red-500 hover:bg-black">
                        <span>Delete list</span>
                        <Trash className="ml-2 inline-block size-4" />
                    </Button>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-6 my-4">
                    {list.investors.map((investor: any, i: any) => (
                        <InvestorCard key={i} investor={investor} listId={list._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default List;