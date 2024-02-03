
function Button({
    children,
    type="button",
    className="",
    bgColor="bg-blue-600",
    textColor="text-white",
    ...props
}) {
  return (
    <button
        className={`px-4 py-2 ${bgColor} ${textColor} ${className}`}
        {...props}
    >
      {children}
    </button>
  )
}

export default Button

