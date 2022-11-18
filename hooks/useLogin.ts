import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { LoginResponse, User } from '../interface';

const useLogin = (email: string, password: string) => {
  const {
    data: loginData,
    isLoading,
    isError,
    refetch,
  } = useQuery<LoginResponse>({
    queryFn: () => axios.post('/auth/login', { email, password }).then(axiosResponse => axiosResponse.data),
    queryKey: ['login'],
    enabled: false,
  });

  return {
    loginData,
    isLoading,
    isError,
    refetch,
  };
};
export default useLogin;
