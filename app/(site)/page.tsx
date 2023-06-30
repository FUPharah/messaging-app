import { DiCssdeck } from 'react-icons/di';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-gray-100 justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <DiCssdeck size="4rem"
          height="48"
          width="48"
          className="mx-auto w-auto
          text-indigo-600"/>
        <h2 className=" mt-6 text-center text-3xl font-bold
          tracking-tight text-gray-900">
            Sign In
        </h2>
      </div>
      <AuthForm />

    </div>
  )
}
