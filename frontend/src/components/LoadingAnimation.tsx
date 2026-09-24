const LoadingAnimation = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-linear-to-br from-indigo-500 to-violet-700 shrink-0">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" />
      </div>
    </div>
  )
}

export default LoadingAnimation