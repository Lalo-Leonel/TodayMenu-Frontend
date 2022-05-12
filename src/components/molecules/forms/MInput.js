import { ALabel } from '../../atoms/ALabel';
import { AErrorInput } from '../../atoms/AErrorInput';

export const MInput = ({
  label,
  name,
  register,
  error,
  className,
  ...props
}) => (
  <div className={`${className}`}>
    <ALabel htmlFor={name}>{label}</ALabel>
    <input
      id={name}
      className="border-2 border-secondary-100 rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
      placeholder={label}
      aria-describedby={error ? `${label}-error` : undefined}
      {...register(name)}
      {...props}
    />
    <AErrorInput label={label} error={error} />
  </div>
);
