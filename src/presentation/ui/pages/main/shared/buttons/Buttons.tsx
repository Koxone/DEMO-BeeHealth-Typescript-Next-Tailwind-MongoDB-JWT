import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type BeeHealthAction =
  | 'confirm'
  | 'success'
  | 'edit'
  | 'cancel'
  | 'delete'
  | 'warning'
  | 'cancel-outline'
  | 'delete-outline'
  | 'edit-outline'
  | 'neutral-outline'
  | 'primary-blue-solid'
  | 'primary-green-solid'
  | 'primary-yellow-solid'
  | 'primary-red-solid'
  | 'secondary-neutral'
  | 'primary-medium-blue-solid';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: BeeHealthAction;
}

const actionStyles: Record<BeeHealthAction, string> = {
  confirm:
    'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover text-white w-full',
  success:
    'bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover text-white w-full',
  edit: 'bg-beehealth-yellow-primary-solid hover:bg-beehealth-yellow-primary-solid-hover text-white w-fit',
  cancel:
    'bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover text-white flex-1',
  delete:
    'bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover text-white flex-1',
  warning:
    'bg-beehealth-orange-primary-solid hover:bg-beehealth-orange-primary-solid-hover text-white flex-1',
  'cancel-outline':
    'border-2 border-beehealth-green-primary-solid text-beehealth-green-primary-solid hover:bg-beehealth-green-primary-light flex-1',
  'delete-outline':
    'border-2 border-beehealth-red-primary-solid text-beehealth-red-primary-solid hover:bg-beehealth-red-tertiary-light flex-1',
  'edit-outline':
    'border-2 border-beehealth-yellow-primary-solid text-beehealth-yellow-primary-dark hover:bg-beehealth-yellow-tertiary-light flex-1',
  'neutral-outline':
    'border-2 border-beehealth-blue-tertiary-solid text-beehealth-blue-primary-dark hover:bg-beehealth-blue-tertiary-light flex-1',
  'primary-blue-solid':
    'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover text-white flex-1',
  'primary-green-solid':
    'bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover text-white flex-1',
  'primary-yellow-solid':
    'bg-beehealth-yellow-primary-solid hover:bg-beehealth-yellow-primary-solid-hover text-gray-800 flex-1',
  'primary-red-solid':
    'bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover text-white flex-1',
  'secondary-neutral':
    'bg-beehealth-body-main border border-gray-300 text-gray-700 hover:bg-gray-100 flex-1',
  'primary-medium-blue-solid':
    'bg-beehealth-green-secondary-dark hover:bg-beehealth-green-secondary-dark-hover text-white w-full shadow-md',
};

const sizeStyles = {
  xs: 'gap-1 rounded-lg px-3 py-2 text-xs',
  sm: 'gap-1.5 rounded-lg px-4 py-2.5 text-sm whitespace-nowrap',
  md: 'gap-2 rounded-xl px-6 py-3.5 text-base',
  lg: 'gap-2.5 rounded-xl px-8 py-4 text-lg',
};

const baseStyles =
  'flex h-fit items-center justify-center font-semibold transition-all active:scale-[0.98] cursor-pointer';
const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale-[0.3]';

export const ButtonXs = ({ action, className = '', ...props }: ButtonProps) => (
  <button
    className={`${baseStyles} ${sizeStyles.xs} ${actionStyles[action]} ${disabledStyles} ${className}`}
    {...props}
  />
);

export const ButtonSm = ({ action, className = '', ...props }: ButtonProps) => (
  <button
    className={`${baseStyles} ${sizeStyles.sm} ${actionStyles[action]} ${disabledStyles} ${className}`}
    {...props}
  />
);

export const ButtonMd = ({ action, className = '', ...props }: ButtonProps) => (
  <button
    className={`${baseStyles} ${sizeStyles.md} ${actionStyles[action]} ${disabledStyles} ${className}`}
    {...props}
  />
);

export const ButtonLg = ({ action, className = '', ...props }: ButtonProps) => (
  <button
    className={`${baseStyles} ${sizeStyles.lg} ${actionStyles[action]} ${disabledStyles} ${className}`}
    {...props}
  />
);

export const ButtonGoBack = ({
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`flex cursor-pointer items-center gap-2 text-gray-600 transition hover:scale-105 hover:text-gray-700 active:scale-95 ${className}`}
      {...props}
    >
      <ArrowLeft className="h-5 w-5" />
      {children || 'Volver'}
    </button>
  );
};
