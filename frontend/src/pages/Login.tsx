import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import logo from "/logo.png";
import { MdMailOutline } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";

const Login = () => {
    return (
        <div className="w-4/5 h-full flex flex-col justify-around items-center">
            <div className="flex items-center [&_img]:m-2">
                <img src={logo} alt="quizriousity-logo" width={95} height={95} />
                <p className="text-6xl">Login</p>
            </div>
            <div className="grid gap-10 w-2/5 text-2xl *:flex *:flex-col [&_input]:rounded-full [&_input]:bg-[#7dcdff] [&_input]:h-10 [&_input]:px-3.5 [&_input]:outline-none [&_input]:border-none">
                <AuthInput id={"e-mail"} icon={MdMailOutline} type="email" label="E-mail" />
                <AuthInput id={"pass"} icon={HiOutlineLockClosed} type="password" label="Password" />
            </div>
            <p className="text-xl">Don't have an account? <Link className="text-blue-700 underline" to="/register">Register</Link></p>
            <Button value="Submit" onClick={() => { console.log("Login submitted") }} />
        </div>
    )
}

export default Login
