import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object, ref } from 'yup';

import { authRegister } from '../../../store/authReducer';

import { MInput } from '../../../components/molecules/forms/MInput';
import { AButton } from '../../../components/atoms/AButton';
import { ChevronLeftIcon } from '@heroicons/react/solid';

export const CardRegister = ({ setToggleAuth }) => {
  const dispatch = useDispatch();

  const schema = object({
    name: string().required('Nombre es requerido'),
    fatherSurname: string().required('Apellido Paterno es requerido'),
    motherSurname: string().required('Apellido Materno es requerido'),
    email: string()
      .email('Ingresar un correo valido')
      .required('Correo es requerido'),
    password: string().required('Contraseña es requerida'),
    passwordConfirm: string()
      .oneOf([ref('password')], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es requerida'),
    role: string().required('El rol es requerido')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
      dispatch(authRegister(data));
      reset();
  });

  return (
    <div className="p-4">
      <span
        className="text-sm flex hover:text-primary cursor-pointer"
        onClick={() => setToggleAuth(true)}>
        <ChevronLeftIcon className="w-4" /> Ir al login
      </span>
      <h3 className="text-black font-bold text-2xl mb-2">Registro</h3>
      <form onSubmit={onSubmit}>
          <MInput
            label="Nombres"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <div className="grid grid-cols-2 gap-3">
            <MInput
              label="Apellido Paterno"
              name="fatherSurname"
              register={register}
              error={errors.fatherSurname?.message}
            />
            <MInput
              label="Apellido Materno"
              name="motherSurname"
              register={register}
              error={errors.motherSurname?.message}
            />
          </div>
          <MInput
            label="Correo"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <MInput
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="off"
            register={register}
            error={errors.password?.message}
          />
          <MInput
            label="Verificar Contraseña"
            name="passwordConfirm"
            type="password"
            autoComplete="off"
            register={register}
            error={errors.passwordConfirm?.message}
          />
          <MInput
            label="Rol"
            name="role"
            register={register}
            error={errors.role?.message}
          />
        <AButton type="submit">
          Registrarse
        </AButton>
      </form>
    </div>
  );
};
