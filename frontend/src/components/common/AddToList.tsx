import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RootState } from "../../redux/index"
import { Plus, SaveAll } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addInvestorToList } from "@/services/operation/listAPI"
interface AddToListProps {
    ids: string[];
    page: boolean;
}

const AddToList: React.FC<AddToListProps> = ({ ids, page }) => {

    const investorLists = useSelector((store: RootState) => store.list.investorLists);
    const email = useSelector((store: RootState) => store.profile.user.email ? store.profile.user.email : null);
    const dispatch = useDispatch();
    const [lists, setLists] = useState([]);
    const [checkedLists, setCheckedLists] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setLists(investorLists);
        console.log('investorLists', investorLists);
    }, [investorLists]);

    const handleCheckboxChange = (value: string) => {
        const isChecked = checkedLists.includes(value);

        let updatedchecked: string[];

        if (isChecked) {
            updatedchecked = checkedLists.filter((item: string) => item !== value);
        } else {
            updatedchecked = [...checkedLists, value];
        }

        setCheckedLists(updatedchecked);
    };

    const handleSubmit = async () => {
        setLoading(true);
        addInvestorToList(checkedLists, ids, email, dispatch);
        setLoading(false);
        setIsOpen(false);
        setCheckedLists([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {page ? (
                    <Button variant="outline" className='rounded'>Save Results to List <SaveAll className="inline-block size-5 ml-2" /></Button>
                ) : (
                    <Button variant="outline" className='rounded-[5px] max-w-fit absolute bottom-2 right-2'>
                        <span>Add to List</span>
                        <Plus className='size-5 ml-2' />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select the Lists where you want to save it</DialogTitle>
                </DialogHeader>
                {
                    lists.length === 0 ? <div className="text-center font-semibold text-sm text-gray-500">No Lists found.</div> :
                        <div className="flex flex-col">
                            {lists.map((list: any) => (
                                <div key={list._id}>
                                    <input type="checkbox" className='w-4 h-4'
                                        id={list.name}
                                        checked={checkedLists.includes(list._id)}
                                        onChange={() => handleCheckboxChange(list._id)}
                                    />
                                    <label
                                        htmlFor={list.name}
                                        className="text-sm ml-2 leading-none font-semibold"
                                    >
                                        {list.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                }
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading || lists.length === 0} className="rounded-[5px]">Save to List(s)</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddToList;