import type { IconType } from "react-icons"

interface AuthInputProps{
    id:string,
    type:string,
    label:string,
    ref:React.RefObject<any>,
    icon:IconType
}

const AuthInput = (props:AuthInputProps) => {
  return (
    <div>
      <label className="flex items-center gap-2" htmlFor={props.id}><props.icon/>{props.label} :</label>
      <input id={props.id} type={props.type || "text"} ref={props.ref} autoComplete="off"/>
    </div>
  )
}

export default AuthInput