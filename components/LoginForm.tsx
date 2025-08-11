import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handle} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-great">
        <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
        <label className="mb-1 block text-sm">Email</label>
        <input
          className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-accent-6"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mb-1 block text-sm">Password</label>
        <input
          className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-accent-6"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        {err && <div className="mb-3 text-sm text-red-500">{err}</div>}
        <button className="w-full rounded-xl bg-accent-1 py-3 font-semibold text-white hover:bg-accent-2">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
