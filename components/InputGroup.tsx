import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputGroupProps<T extends FieldValues> {
  minLength: number;
  requiredMessage: string;
  minMessage: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  input: Path<T>;
}

const InputGroup = <T extends FieldValues>({ requiredMessage, minMessage, minLength, placeholder, register, error, input }: InputGroupProps<T>) => {
  return (
    <>
      <input
        className={`border p-2 mb-2 rounded block w-full focus:outline-none ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        {...register(input, {
          required: { value: true, message: requiredMessage },
          minLength: {
            value: minLength,
            message: minMessage,
          },
        })}
      />

      <p className={`mb-2 ${error ? 'text-red-500' : ''}`}>{error ? error.message : '좋아요'}</p>
    </>
  );
};

export default InputGroup;
