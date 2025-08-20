interface ButtonProps{
    onClick:any,
    value:string
}

const Button = (props:ButtonProps) => {
  return (
      <button className="h-auto w-auto px-10 py-2 text-2xl bg-[#005678] rounded-full active:scale-[0.9] active:bg-[#005678] hover:bg-[#005678d2] " onClick={props.onClick}>{props.value}</button>
  )
}

export default Button
