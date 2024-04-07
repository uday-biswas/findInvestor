import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, TriangleAlert } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { createList } from "@/services/operation/listAPI"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/index"

interface List {
    name: string;
    desc: string;
    investors: any;
    dateCreated: any;
    dataModified: any;
}

export function CreateNewList() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const lists = useSelector((store: RootState) => store.list.investorLists);
    const email = useSelector((state: RootState) => state.profile.user ? state.profile.user.email : null);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const checkName = (name: string) => {
        setError(false);
        setName(name);
        if ((lists as List[]).some(list => list.name === name)) {
            setError(true);
        }
    }

    const handleSubmit = () => {

        // Call the createList API and update Redux store
        createList(name, description, email, dispatch);

        // Reset form fields
        setName('');
        setDescription('');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className='rounded'>
                    Create New List
                    <Plus className="inline-block size-5 ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Investor List</DialogTitle>
                    <DialogDescription>
                        Curated list of investors from you.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="name">
                            Name <span className="text-pink-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="Series A Prospects"
                            className="col-span-3 rounded-[5px]"
                            value={name}
                            onChange={(e) => checkName(e.target.value)}
                        />
                        {error && <div className="flex text-red-500 gap-2"><TriangleAlert /><div>Already Exists </div></div>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="description">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="List of Series A investor for funding"
                            className="rounded-[5px] h-[120px] resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex justify-between w-full">
                        <DialogClose className="rounded-[5px]">
                            <Button variant="outline" className="rounded-[5px]">Cancel</Button>
                        </DialogClose>
                        <Button disabled={error} onClick={handleSubmit} className="rounded-[5px]">Create List</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
