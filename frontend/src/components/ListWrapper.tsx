const ListWrapper = (props:any) => {
    return (
        <div className={'h-9/11 my-auto ' + props.className}>
            <ul className='h-full p-4 flex flex-col overflow-auto gap-3.5 text-2xl font-semibold
            custom-scrollbar 
            *:flex *:items-center *:min-h-1/8 *:bg-[#39686F] *:rounded-xl *:px-7 '>
                { props.children }
            </ul>
        </div>
    )
}

export default ListWrapper

