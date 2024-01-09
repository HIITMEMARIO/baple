import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from '@/components/login/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/login/EyeSlashFilledIcon';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Seo from '@/components/Seo';
import { supabase } from '@/libs/supabase';

interface FormValues {
  email: string;
  password: string;
}

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const logInHandler: SubmitHandler<FormValues> = async (formData) => {
    const { email, password } = formData;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('data', data);
    if (error) {
      console.error('error', error);
    }
  };
  return (
    <>
      <Seo title='Login' />
      <div className='h-screen flex flex-col justify-center items-center gap-2'>
        <form onSubmit={handleSubmit(logInHandler)}>
          <Input
            isClearable
            type='email'
            label='Email'
            variant='bordered'
            placeholder='이메일 아이디를 입력해주세요'
            className='max-w-xs'
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 메일 형식이 아닙니다',
              },
            })}
          />
          {errors.email && (
            <p className='text-red-500 text-xs'>{errors.email.message}</p>
          )}
          <Input
            label='Password'
            variant='bordered'
            placeholder='비밀번호를 입력해주세요'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className='max-w-xs'
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                message: '비밀번호 조건에 맞게 입력해주세요',
              },
            })}
          />
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
          <Button
            color='primary'
            type='submit'
            isDisabled={!watchEmail || !watchPassword}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LogInPage;
