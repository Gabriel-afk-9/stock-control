import { LoginForm } from '@/features/auth/presentation/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">Controle de Estoque</h1>
        <p className="text-gray-500">Faça login para acessar o sistema.</p>
        <LoginForm />
      </div>
    </main>
  );
}