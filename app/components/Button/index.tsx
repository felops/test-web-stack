import type { NextPage } from 'next'

interface ButtonProps {
  loading?: boolean
  onClick: () => Promise<void>
}

const Button: NextPage <ButtonProps> = ({
  children,
  loading,
  onClick,
}) => {
  const onButtonClick = () => {
    if (!loading) {
      onClick()
    }
  }
  return (
    <button
      className="uppercase font-semibold text-sm px-12 py-4 rounded-md bg-white border-gray-200 hover:border-gray-500 border-2"
      onClick={onButtonClick}
    >
      { loading
        ? (
            <span className="flex flex-wrap space-around">
              <svg className="animate-spin mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
              </svg>
              Loading
            </span>
          )
        : children
      }
    </button>
  )
}

export default Button
