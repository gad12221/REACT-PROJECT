import { FC, InputHTMLAttributes } from "react";
import "./Input.scss";
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FC<InputProps> = (props) => {

  return (
    <div className="input-container">
      <label>{props.placeholder}</label>
      <input {...props} />
      <CiCircleRemove color="red" size={52} />
      <CiCircleCheck color="green" size={52} />
    </div>
  );
};

export default Input;