// @ts-nocheck
import LoadingButton from '@/components/loading-button'
import Logo from '@/components/logo'
import TextInput from '@/components/text-input'
import { Head, useForm } from '@inertiajs-revamped/react'
import type { FormEvent } from 'react'

export default function Login() {
  const { data, setData, errors, post, processing } = useForm({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: false,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post('/login')
  }

  return (
    <div className="flex items-center justify-center p-6 min-h-screen bg-indigo-800">
      <Head title="Login">
        <meta name="title" content="Login - Ping CRM" />
        <meta
          name="description"
          content="A demo application to illustrate how Inertia.js works with Laravel and Preact."
        />
        <meta
          name="keywords"
          content="laravel, inertia, inertiajs, inertia.js-revamped, pingcrm, pingcrm-react"
        />
        <meta name="robots" content="index, nofollow" />
      </Head>
      <div className="w-full max-w-md">
        <Logo
          className="block mx-auto w-full max-w-xs fill-white"
          height="50"
        />
        <form
          className="mt-8 bg-white rounded-lg shadow-xl overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="px-10 py-12">
            <h1 className="text-center text-3xl font-bold">Welcome Back!</h1>
            <div className="mt-6 mx-auto w-24 border-b-2" />
            <TextInput
              className="mt-10"
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              value={data.email}
              onChange={(event) => setData('email', event.target.value)}
            />
            <TextInput
              className="mt-6"
              label="Password"
              name="password"
              type="password"
              error={errors.password}
              value={data.password}
              onChange={(event) => setData('password', event.target.value)}
            />
            <label
              className="flex items-center mt-6 select-none"
              htmlFor="remember"
            >
              <input
                name="remember"
                id="remember"
                className="mr-1"
                type="checkbox"
                checked={data.remember}
                onChange={(event) => setData('remember', event.target.checked)}
              />
              <span className="text-sm">Remember Me</span>
            </label>
          </div>
          <div className="flex px-10 py-4 bg-gray-100 border-t border-gray-100">
            <LoadingButton
              type="submit"
              loading={processing}
              className="btn-indigo ml-auto"
            >
              Login
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}
