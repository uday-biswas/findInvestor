import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { deleteList } from "@/services/operation/listAPI"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/index"
import { useNavigate } from "react-router-dom"

interface DeleteListProps {
    id: string;
    deleteOpen: any;
    setDeleteOpen: any;
}

const DeleteList: React.FC<DeleteListProps> = ({ id, deleteOpen, setDeleteOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useSelector((state: RootState) => state.profile.user ? state.profile.user.email : null);

    const handleSubmit = () => {

        // Call the createList API and update Redux store
        deleteList(id, email, dispatch, navigate);
        setDeleteOpen(false);
    };

    return (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure to delete this list ?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-between w-full">
                        <DialogClose className="rounded-[5px]">
                            <Button variant="outline" className="rounded-[5px]">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} className="rounded-[5px]">Delete List</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteList;