interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export default function Loader({
  label = "Loading...",
  fullScreen = true,
}: LoaderProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-[70vh]" : "py-14"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="spinner" />
        <p className="text-sm font-bold text-slate-500">{label}</p>
      </div>
    </div>
  );
}
