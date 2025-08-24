interface ButtonProps{
    onClick:any,
    value:string
}

const Button = (props:ButtonProps) => {
  return (
      <button className="h-auto w-auto px-10 py-2 text-2xl bg-button rounded-full active:scale-[0.9] active:bg-button hover:bg-[#005678d2] " onClick={props.onClick}>{props.value}</button>
  )
}

export default Button