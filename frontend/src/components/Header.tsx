import logo from '/logo.png';

const Header = () => {
    return (
        <div className='flex h-1/12 justify-center bg-header '>
            <div className='flex gap-2 items-center p-2'>
                <img src={logo} alt="logo" width={50} height={50} />
                <p className='text-4xl font-semibold'>Quizriousity</p>
            </div>
        </div>
    )
}

export default Header
