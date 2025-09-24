interface ButtonProps{
    onClick:any,
    value:string
}

const Button = (props:ButtonProps) => {
  return (
      <button className="h-auto w-auto px-2 sm:px-5 sm:py-1.5 md:px-8 lg:px-10 lg:py-2 sm:text-xl md:text-2xl bg-button rounded-full active:scale-[0.9] active:bg-button hover:bg-[#005678d2] " onClick={props.onClick}>{props.value}</button>
  )
}

export default Button