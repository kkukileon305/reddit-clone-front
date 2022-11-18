import { FieldError, UseFormRegister } from 'react-hook-form';
import { Inputs } from '../pages/register';

interface InputGroupProps {
  minLength: number;
  requiredMessage: string;
  minMessage: string;
  placeholder: string;
  register: UseFormRegister<Inputs>;
  error: FieldError | undefined;
  input: 'email' | 'username' | 'password';
}

const InputGroup = ({ requiredMessage, minMessage, minLength, placeholder, register, error, input }: InputGroupProps) => {
  return (
    <>
      <input
        className='border p-2 mb-2 rounded block w-full focus:outline-none'
        placeholder={placeholder}
        {...register(input, {
          required: { value: true, message: requiredMessage },
          minLength: {
            value: minLength,
            message: minMessage,
          },
        })}
        style={{ border: error ? '1px solid red' : '' }}
      />
      <p className='mb-2' style={{ color: error ? 'red' : '' }}>
        {error ? error.message : '좋아요'}
      </p>
    </>
  );
};

export default InputGroup;
