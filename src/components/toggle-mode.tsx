import { ToggleType } from '@/types/common/components';

export default function ToggleMode({ value, onChange = () => {} }: ToggleType) {
  return (
    <>
      <input
        id="toggle"
        className="hidden"
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      <label
        className="relative flex h-10 min-w-24 cursor-pointer items-center justify-center gap-4 rounded-[30px] bg-[var(--color-12)] px-4 py-2"
        htmlFor="toggle"
      >
        <img
          className="h-6 w-6 brightness-[--brightness-02]"
          src="/images/icon/sun.svg"
          alt=""
        />
        <img
          className="h-6 w-6 brightness-[--brightness-02]"
          src="/images/icon/moon.svg"
          alt=""
        />
        <div
          className={`absolute left-14 h-6 w-6 rounded-[20px] bg-[var(--color-11)] ${value === 'dark' ? 'left-4' : ''}`}
        ></div>
      </label>
    </>
  );
}
