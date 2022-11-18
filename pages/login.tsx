import { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputGroup from '../components/InputGroup';
import useLogin from '../hooks/useLogin';
import { LoginResponse, User } from '../interface';

export type Inputs = {
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<Inputs>();

  const { isError, isLoading, loginData, refetch } = useLogin(watch('email'), watch('password'));
  const onSubmit: SubmitHandler<Partial<Inputs>> = async () => {
    try {
      const { data } = await refetch<AxiosResponse<LoginResponse>>();

      if (!data) throw new Error('이상함');

      console.log(data.token);
    } catch (error) {
      console.log(error);

      const { response } = error as AxiosError<Partial<User>>;

      if (!response) return;

      response.data.email && setError('email', { message: response.data.email });
      response.data.password && setError('password', { message: response.data.password });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh]'>
      <form className='min-w-[400px]' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='font-bold text-2xl mb-4'>로그인</h2>
        <InputGroup //
          error={errors.email}
          input={'email'}
          minLength={2}
          minMessage={'최소 2글자'}
          placeholder='email'
          register={register}
          requiredMessage='입력해주세요'
        />
        <InputGroup //
          error={errors.password}
          input={'password'}
          minLength={6}
          minMessage={'최소 6글자'}
          placeholder='password'
          register={register}
          requiredMessage='입력해주세요'
        />

        <input value='SIGN IN' className='block w-full bg-gray-600 my-4 py-2 rounded text-white font-bold' type='submit' />
      </form>
      <small>
        처음이신가요?
        <Link className='text-blue-400 font-bold ml-2' href={'register'}>
          회원가입
        </Link>
      </small>
    </div>
  );
}
