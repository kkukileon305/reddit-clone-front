import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroupProps from '../components/InputGroup';

export type Inputs = {
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, username }) => {
    try {
      const { data } = await axios.post('/auth/register', { email, password, username });
      console.log(data);
      // router.push('/login');
    } catch (error) {
      console.log(error);

      const { response } = error as AxiosError<{ email?: string; username?: string }>;

      if (!response) return;

      const { email: errorEmail, username: errorUsername } = response.data;
      errorEmail && setError('email', { message: errorEmail });
      errorUsername && setError('username', { message: errorUsername });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh]'>
      <form className='min-w-[400px]' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='font-bold text-2xl mb-4'>회원가입</h2>
        <InputGroupProps //
          error={errors.email}
          input={'email'}
          minLength={2}
          minMessage={'최소 2글자'}
          placeholder='email'
          register={register}
          requiredMessage='입력해주세요'
        />
        <InputGroupProps //
          error={errors.username}
          input={'username'}
          minLength={3}
          minMessage={'최소 3글자'}
          placeholder='username'
          register={register}
          requiredMessage='입력해주세요'
        />
        <InputGroupProps //
          error={errors.password}
          input={'password'}
          minLength={6}
          minMessage={'최소 6글자'}
          placeholder='password'
          register={register}
          requiredMessage='입력해주세요'
        />

        <input value='SIGN UP' className='block w-full bg-gray-600 my-4 py-2 rounded text-white font-bold' type='submit' />
      </form>
      <small>
        이미 가입하셨나요?{' '}
        <Link className='text-blue-400 font-bold' href={'login'}>
          로그인
        </Link>
      </small>
    </div>
  );
}
