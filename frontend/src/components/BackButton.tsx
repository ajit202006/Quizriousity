import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button className='hidden  absolute lg:grid left-10 top-10 w-[3vw] h-[3vw] text-4xl rounded-full bg-button place-items-center' onClick={() => navigate(-1)} ><IoIosArrowRoundBack /></button>
    )
}

export default BackButton;