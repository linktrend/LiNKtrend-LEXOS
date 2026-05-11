import LoginForm from "./LoginForm";

export const metadata = { title: "Sign In — LEXOS" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md border border-gray-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            LEXOS
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Legal Operations Platform — Sign in to continue
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
