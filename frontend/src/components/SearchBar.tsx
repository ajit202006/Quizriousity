import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
    id: string,
    clickEvent:any,
    ref:React.RefObject<any>,
}

const SearchBar = (props: SearchBarProps) => {
    return (
        <div className='flex items-center justify-center h-1/12 *:h-4/7 *:bg-[#7dcdff] '>
            <input className='rounded-l-full w-4/5 sm:w-3/5 lg:w-2/6 pl-3 outline-none border-none' id={props.id}  type='text' placeholder={`Enter ${props.id} name...`} onKeyDown={(e)=>{
                if (e.key === 'Enter'){
                    props.clickEvent();
                }
            }} ref={props.ref}/>
            <button className='rounded-r-full px-2 hover:bg-[#26a6eb]' onClick={props.clickEvent} ><IoSearch/></button>
        </div>
    )
}

export default SearchBar
