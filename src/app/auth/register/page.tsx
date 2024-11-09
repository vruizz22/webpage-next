'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from '@/auth';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const setErrors = useState({})[1];
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.password_confirmation) {
        alert('Las contraseñas no coinciden');
        return;
      }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const resJSON = await res.json();

      // unir los errores de username y email
      if (res.status === 400) {
        if (resJSON.error === 'El nombre de usuario ya existe') {
          console.log('username error');
          setErrors({
            username: {
              message: resJSON.error,
            },
          });
        } else if (resJSON.error === 'El email ya existe') {
          console.log('email error');
          setErrors({
            email: {
              message: resJSON.error,
            },
          });
        }
      }

      if (res.ok) {
        // Enviar email de verificación
        await signIn('email', { email: data.email });
        // Redirigir a la pagina de verificación de email con el email
        router.push(`/auth/verify-email?email=${data.email}`);
      }
    } catch (error) {
      console.error('Error registrando el usuario:', error);
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-black-200 font-bold text-4xl mb-4">Register</h1>

        <label htmlFor="username" className="text-black-500 mb-2 block text-sm">
          Username:
        </label>

        <input
          type="text"
          {...register('username', {
            required: {
              value: true,
              message: 'El Username es requerido',
            },
          })}
        />
        {errors.username && (
          <span className="text-red-500">
            {errors.username?.message as string}
          </span>
        )}

        <label htmlFor="email" className="text-black-500 mb-2 block text-sm">
          Email:
        </label>

        <input
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'El Email es requerido',
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">
            {errors.email?.message as string}
          </span>
        )}

        <label htmlFor="password" className="text-black-500 mb-2 block text-sm">
          Contraseña:
        </label>

        <input
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'La Contraseña es requerida',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">
            {errors.password?.message as string}
          </span>
        )}

        <label
          htmlFor="password_confirmation"
          className="text-black-500 mb-2 block text-sm"
        >
          Confirmar Contraseña:
        </label>

        <input
          type="password"
          {...register('password_confirmation', {
            required: {
              value: true,
              message: 'La Confirmación de la contraseña es requerida',
            },
          })}
        />
        {errors.password_confirmation && (
          <span className="text-red-500">
            {errors.password_confirmation?.message as string}
          </span>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
