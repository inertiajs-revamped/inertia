// @ts-nocheck
import {
  type ComponentProps,
  type ComponentPropsWithRef,
  type FormEvent,
  createRef,
  useState,
} from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
  text: string
}

const Button = ({ text, onClick }: ButtonProps) => (
  <button
    type="button"
    className="px-4 py-1 text-white text-xs font-medium bg-gray-600 hover:bg-gray-700 rounded-sm focus:outline-none"
    onClick={onClick}
  >
    {text}
  </button>
)

export interface FileInputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'onInput'> {
  label: string
  error?: string
  onInput: (photo: File) => void
}

export default function FileInput({
  className,
  name,
  label,
  accept,
  error,
  onInput,
}: FileInputProps) {
  const fileRef = createRef<HTMLInputElement>()
  const [file, setFile] = useState<File | null>(null)

  const filesize = (size: number) => {
    var i = Math.floor(Math.log(size) / Math.log(1024))
    return (
      (size / Math.pow(1024, i)).toFixed(2) +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    )
  }

  const browse = () => {
    if (fileRef) {
      fileRef.current?.click()
    }
  }

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement

    if (!input.files?.length) {
      return
    }

    const file = input.files[0]

    setFile(file)
    onInput(file)
  }

  const remove = () => {
    setFile(null)
    onInput({ name: '' } as File)
    fileRef.current!.value = ''
  }

  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className={`form-input p-0 ${error && 'error'}`}>
        <input
          id={name}
          ref={fileRef}
          accept={accept}
          type="file"
          className="hidden"
          onInput={handleFileChange}
        />
        {!file && (
          <div className="p-2">
            <Button text="Browse" onClick={browse} />
          </div>
        )}
        {file && (
          <div className="flex items-center justify-between p-2">
            <div className="flex-1 pr-1">
              {file.name}
              <span className="ml-1 text-gray-600 text-xs">
                ({filesize(file.size)})
              </span>
            </div>
            <Button text="Remove" onClick={remove} />
          </div>
        )}
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}
