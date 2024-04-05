import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { RootState } from "../../redux/index";
import BounceLoader from "react-spinners/BounceLoader";

function Template({ title, formType }: {
    title: string,
    formType: string
}) {
    const { loading } = useSelector((store: RootState) => store.auth);

    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center">
            {loading ? (
                <BounceLoader
                    color={"blue"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div className="mx-auto w-11/12 max-w-[450px] p-8 border-[0.5px] border-gray-500 rounded-[5px]">
                    <h1 className="text-[1.875rem] mb-5 leading-[2.375rem] text-richblack-5">
                        {title}
                    </h1>
                    {formType === "signup" ? <SignupForm /> : <LoginForm />}
                </div>
            )}
        </div>
    );
}

export default Template;
