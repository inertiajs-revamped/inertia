// @ts-nocheck
import InputError from '@/components/input-error'
import PrimaryButton from '@/components/primary-button'
import TextInput from '@/components/text-input'
import GuestLayout from '@/layouts/guest-layout'
import { Head, useForm } from '@inertiajs-revamped/react'
import type { FormEventHandler } from 'react'

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post('/forgot-password')
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(e) => setData('email', e.target.value)}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
