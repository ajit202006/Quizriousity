import logo from '/logo.png';

const Header = () => {
    return (
        <div className='flex h-10 sm:min-h-1/12 justify-center bg-header '>
            <div className='flex gap-2 items-center p-2'>
                <img className='w-6 h-6 sm:w-[50px] sm:h-[50px]' src={logo} alt="logo" />
                <p className='text-2xl sm:text-3xl md:text-4xl md:font-semibold'>Quizriousity</p>
            </div>
        </div>
    )
}

export default Header
