// @ts-nocheck
import AuthenticatedLayout from '@/layouts/authenticated-layout'
import { Head, type ProfilePageProps } from '@inertiajs-revamped/react'
import DeleteUserForm from './partials/delete-user-form'
import UpdatePasswordForm from './partials/update-password-form'
import UpdateProfileInformationForm from './partials/update-profile-information-form'

export default function Edit({
  auth,
  mustVerifyEmail,
  status,
}: ProfilePageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
