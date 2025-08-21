const ListWrapper = (props:any) => {
    return (
        <div className=' h-9/11 my-auto'>
            <ul className='h-full p-4 flex flex-col overflow-auto gap-3.5 text-2xl font-semibold
            [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#B9D5FF] [&::-webkit-scrollbar-thumb]:bg-[#0674A0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full 
            *:flex *:items-center *:min-h-1/8 *:bg-[#39686F] *:rounded-xl *:px-7 '>
                { props.children }
            </ul>
        </div>
    )
}

export default ListWrapper

