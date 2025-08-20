import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
    id: string
}

const SearchBar = (props: SearchBarProps) => {
    return (
        <div className='flex items-center justify-center h-1/12 font-medium *:h-4/7 *:bg-[#7dcdff] '>
            <input className='rounded-l-full w-2/6 pl-3 outline-none border-none' id={props.id}  type='text' placeholder={`Enter ${props.id} name...`}/>
            <button className='rounded-r-full px-2 hover:bg-[#26a6eb]'><IoSearch/></button>
        </div>
    )
}

export default SearchBar
