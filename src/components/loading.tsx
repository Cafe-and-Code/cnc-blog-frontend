export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-11)]">
      <span className="relative text-[80px] tracking-[5px] uppercase leading-none mix-blend-difference before:absolute before:left-0 before:top-0 before:w-[100px] before:h-full before:bg-[var(--color-11)] before:-z-10 before:animate-loading-move">
        Loading
      </span>
    </div>
  );
}
