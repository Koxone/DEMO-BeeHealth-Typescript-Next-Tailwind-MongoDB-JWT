//! Login
// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// type LoginFormData = {
//   email: string;
//   password: string;
// };

// export default function Login() {
//   // State
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // React Hook Form
//   const { register, handleSubmit } = useForm<LoginFormData>();

//   // Submit handler
//   const onSubmit = async (data: LoginFormData) => {
//     // Loading
//     setLoading(true);
//     setError('');

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: data.email,
//           password: data.password,
//         }),
//       });

//       if (!res.ok) {
//         const result = await res.json();
//         throw new Error(result.message || 'Login failed');
//       }

//       const result = await res.json();
//       console.log('Logged user:', result);
//       localStorage.setItem('token', result.token);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // Form
//     <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-sm flex-col gap-3">
//       <input type="email" placeholder="Email" {...register('email', { required: true })} />

//       <input type="password" placeholder="Password" {...register('password', { required: true })} />

//       {error && <p>{error}</p>}

//       <button type="submit" disabled={loading}>
//         {loading ? 'Loading...' : 'Login'}
//       </button>
//     </form>
//   );
// }

//! Signup
// 'use client';

// import { useState } from 'react';

// type Role = 'patient' | 'doctor' | 'admin' | 'employee';
// type Specialty = 'weight' | 'dental' | 'stetic' | 'none';

// export default function SignupForm() {
//   // State
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<Role>('patient');
//   const [specialty, setSpecialty] = useState<Specialty>('none');

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Submit
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!name.trim() || !lastName.trim() || !phone.trim() || !email.trim() || !password.trim()) {
//       setError('Completa todos los campos.');
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: name.trim(),
//           lastName: lastName.trim(),
//           phone: phone.trim(),
//           email: email.trim(),
//           password,
//           role,
//           specialty,
//         }),
//       });

//       const data = await res.json();

//       // Debug
//       console.log('STATUS', res.status);
//       console.log('RESPONSE', data);

//       if (!res.ok) {
//         setError(data?.message || 'Error al crear la cuenta.');
//         return;
//       }

//       setSuccess('Cuenta creada correctamente.');
//       setName('');
//       setLastName('');
//       setPhone('');
//       setEmail('');
//       setPassword('');
//       setRole('patient');
//       setSpecialty('none');
//     } catch {
//       setError('Error de red.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       className={[
//         'mobile',
//         'mx-auto',
//         'w-full',
//         'max-w-md',
//         'rounded-2xl',
//         'border',
//         'border-white/10',
//         'bg-black/40',
//         'p-6',
//         'backdrop-blur',
//       ].join(' ')}
//     >
//       <h1 className={['mobile', 'mb-4', 'text-xl', 'font-semibold', 'text-white'].join(' ')}>
//         Crear cuenta
//       </h1>

//       <form onSubmit={handleSubmit} className={['mobile', 'flex', 'flex-col', 'gap-3'].join(' ')}>
//         <div className={['mobile', 'flex', 'gap-3'].join(' ')}>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Nombre"
//             autoComplete="given-name"
//             className={[
//               'mobile',
//               'w-1/2',
//               'rounded-xl',
//               'border',
//               'border-white/10',
//               'bg-black/30',
//               'px-3',
//               'py-2',
//               'text-white',
//               'outline-none',
//               'focus:border-white/30',
//             ].join(' ')}
//           />

//           <input
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Apellido"
//             autoComplete="family-name"
//             className={[
//               'mobile',
//               'w-1/2',
//               'rounded-xl',
//               'border',
//               'border-white/10',
//               'bg-black/30',
//               'px-3',
//               'py-2',
//               'text-white',
//               'outline-none',
//               'focus:border-white/30',
//             ].join(' ')}
//           />
//         </div>

//         <input
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="Teléfono"
//           autoComplete="tel"
//           inputMode="numeric"
//           className={[
//             'mobile',
//             'w-full',
//             'rounded-xl',
//             'border',
//             'border-white/10',
//             'bg-black/30',
//             'px-3',
//             'py-2',
//             'text-white',
//             'outline-none',
//             'focus:border-white/30',
//           ].join(' ')}
//         />

//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           type="email"
//           autoComplete="email"
//           className={[
//             'mobile',
//             'w-full',
//             'rounded-xl',
//             'border',
//             'border-white/10',
//             'bg-black/30',
//             'px-3',
//             'py-2',
//             'text-white',
//             'outline-none',
//             'focus:border-white/30',
//           ].join(' ')}
//         />

//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Contraseña"
//           type="password"
//           autoComplete="new-password"
//           className={[
//             'mobile',
//             'w-full',
//             'rounded-xl',
//             'border',
//             'border-white/10',
//             'bg-black/30',
//             'px-3',
//             'py-2',
//             'text-white',
//             'outline-none',
//             'focus:border-white/30',
//           ].join(' ')}
//         />

//         <div className={['mobile', 'flex', 'gap-3'].join(' ')}>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value as Role)}
//             className={[
//               'mobile',
//               'w-1/2',
//               'rounded-xl',
//               'border',
//               'border-white/10',
//               'bg-black/30',
//               'px-3',
//               'py-2',
//               'text-white',
//               'outline-none',
//               'focus:border-white/30',
//             ].join(' ')}
//           >
//             <option value="patient">patient</option>
//             <option value="doctor">doctor</option>
//             <option value="admin">admin</option>
//             <option value="employee">employee</option>
//           </select>

//           <select
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value as Specialty)}
//             className={[
//               'mobile',
//               'w-1/2',
//               'rounded-xl',
//               'border',
//               'border-white/10',
//               'bg-black/30',
//               'px-3',
//               'py-2',
//               'text-white',
//               'outline-none',
//               'focus:border-white/30',
//             ].join(' ')}
//           >
//             <option value="none">none</option>
//             <option value="weight">weight</option>
//             <option value="dental">dental</option>
//             <option value="stetic">stetic</option>
//           </select>
//         </div>

//         {error ? (
//           <p
//             className={[
//               'mobile',
//               'rounded-xl',
//               'border',
//               'border-red-500/20',
//               'bg-red-500/10',
//               'px-3',
//               'py-2',
//               'text-sm',
//               'text-red-200',
//             ].join(' ')}
//           >
//             {error}
//           </p>
//         ) : null}

//         {success ? (
//           <p
//             className={[
//               'mobile',
//               'rounded-xl',
//               'border',
//               'border-emerald-500/20',
//               'bg-emerald-500/10',
//               'px-3',
//               'py-2',
//               'text-sm',
//               'text-emerald-200',
//             ].join(' ')}
//           >
//             {success}
//           </p>
//         ) : null}

//         <button
//           type="submit"
//           disabled={loading}
//           className={[
//             'mobile',
//             'mt-1',
//             'rounded-xl',
//             'bg-white',
//             'px-4',
//             'py-2.5',
//             'text-sm',
//             'font-semibold',
//             'text-black',
//             'disabled:cursor-not-allowed',
//             'disabled:opacity-60',
//           ].join(' ')}
//         >
//           {loading ? 'Creando...' : 'Crear cuenta'}
//         </button>
//       </form>
//     </div>
//   );
// }

//! Change Password
'use client';

import { useState } from 'react';

export default function ChangePasswordForm() {
  // State
  const [userId, setUserId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId.trim() || !currentPassword.trim() || !newPassword.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId.trim(),
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Error al cambiar la contraseña.');
        return;
      }

      setSuccess('Contraseña actualizada.');
      setUserId('');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setError('Error de red.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={[
        'mobile',
        'mx-auto',
        'w-full',
        'max-w-md',
        'rounded-2xl',
        'border',
        'border-white/10',
        'bg-black/40',
        'p-6',
        'backdrop-blur',
      ].join(' ')}
    >
      <h1 className={['mobile', 'mb-4', 'text-xl', 'font-semibold', 'text-white'].join(' ')}>
        Cambiar contraseña
      </h1>

      <form onSubmit={handleSubmit} className={['mobile', 'flex', 'flex-col', 'gap-3'].join(' ')}>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          autoComplete="off"
          className={[
            'mobile',
            'w-full',
            'rounded-xl',
            'border',
            'border-white/10',
            'bg-black/30',
            'px-3',
            'py-2',
            'text-white',
            'outline-none',
            'focus:border-white/30',
          ].join(' ')}
        />

        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Contraseña actual"
          type="password"
          autoComplete="current-password"
          className={[
            'mobile',
            'w-full',
            'rounded-xl',
            'border',
            'border-white/10',
            'bg-black/30',
            'px-3',
            'py-2',
            'text-white',
            'outline-none',
            'focus:border-white/30',
          ].join(' ')}
        />

        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
          type="password"
          autoComplete="new-password"
          className={[
            'mobile',
            'w-full',
            'rounded-xl',
            'border',
            'border-white/10',
            'bg-black/30',
            'px-3',
            'py-2',
            'text-white',
            'outline-none',
            'focus:border-white/30',
          ].join(' ')}
        />

        {error ? (
          <p
            className={[
              'mobile',
              'rounded-xl',
              'border',
              'border-red-500/20',
              'bg-red-500/10',
              'px-3',
              'py-2',
              'text-sm',
              'text-red-200',
            ].join(' ')}
          >
            {error}
          </p>
        ) : null}

        {success ? (
          <p
            className={[
              'mobile',
              'rounded-xl',
              'border',
              'border-emerald-500/20',
              'bg-emerald-500/10',
              'px-3',
              'py-2',
              'text-sm',
              'text-emerald-200',
            ].join(' ')}
          >
            {success}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className={[
            'mobile',
            'mt-1',
            'rounded-xl',
            'bg-white',
            'px-4',
            'py-2.5',
            'text-sm',
            'font-semibold',
            'text-black',
            'disabled:cursor-not-allowed',
            'disabled:opacity-60',
          ].join(' ')}
        >
          {loading ? 'Cambiando...' : 'Cambiar contraseña'}
        </button>
      </form>
    </div>
  );
}
