import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RootState } from "@/redux";
import { updateProfile } from "@/services/operation/profileAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface ProfileProps {
    detailsModal: boolean;
    setDetailsModal: (value: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ detailsModal, setDetailsModal }) => {
    const user = useSelector((store: RootState) => store.profile.user ? store.profile.user : null);

    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [dob, setDob] = useState("");
    const [contact, setContact] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setGender(user.additionalDetails.gender);
        setAbout(user.additionalDetails.about);
        setDob(user.additionalDetails.dataOfBirth);
        setContact(user.additionalDetails.contactNumber);
    }, [user]);

    const saveProfile = () => {
        updateProfile(gender, about, dob, contact, user.email, dispatch);
        setDetailsModal(false)
    }

    return (
        <Dialog open={detailsModal} onOpenChange={setDetailsModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="gender">
                            Gender
                        </Label>
                        {/* <Input
                            id="gender"
                            defaultValue={user.additionalDetails.gender ? user.additionalDetails.gender : ""}
                            className="col-span-3 rounded-[5px]"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        /> */}
                        <Select onValueChange={(value) => setGender(value)} defaultValue={user.additionalDetails.gender ? user.additionalDetails.gender : ""}>
                            <SelectTrigger className="w-[180px] rounded-[5px]">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="contact">
                            Contact Number
                        </Label>
                        <Input
                            id="contact"
                            defaultValue={user.additionalDetails.contact ? user.additionalDetails.contact : ""}
                            className="col-span-3 rounded-[5px]"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="dob">
                            Date Of Birth
                        </Label>
                        <Input
                            id="dob"
                            defaultValue={user.additionalDetails.dateOfBirth ? user.additionalDetails.dateOfBirth : ""}
                            className="col-span-3 rounded-[5px]"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="about">
                            About
                        </Label>
                        <Textarea
                            id="about"
                            defaultValue={user.additionalDetails.about ? user.additionalDetails.about : ""}
                            className="col-span-3 rounded-[5px]"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={saveProfile}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Profile;