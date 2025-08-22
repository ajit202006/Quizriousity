import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

interface BackButtonProps{
    toPath:string,
    title:string
}

const BackButton = (props:BackButtonProps) => {
    const navigate = useNavigate();
    return (
        <button className='absolute grid left-10 top-10 w-[3vw] h-[3vw] text-4xl rounded-full bg-button place-items-center' onClick={() => navigate(props.toPath)} title={props.title}><IoIosArrowRoundBack /></button>
    )
}

export default BackButton;