const ListWrapper = (props:any) => {
    return (
        <div className={'h-9/11 my-auto ' + props.className}>
            <ul className='h-full px-2 sm:p-4 flex flex-col overflow-auto gap-2 md:gap-3.5 text-xl sm:text-2xl md:font-semibold
            custom-scrollbar 
            *:flex *:items-center *:min-h-1/10 md:*:min-h-1/8 *:bg-li text-black *:rounded-xl *:px-5 md:*:px-7 '>
                { props.children }
            </ul>
        </div>
    )
}

export default ListWrapper;
