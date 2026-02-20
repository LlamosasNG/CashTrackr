type ErrorMessageType = {
  children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageType) {
  return (
    <p className="text-center my-4 bg-red-500 hover:bg-red-700 text-white font-bold p-3 uppercase text-sm rounded-sm shadow-md transition-colors duration-200">
      {children}
    </p>
  )
}
