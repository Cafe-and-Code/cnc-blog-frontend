import '@/styles/components/toggle-mode.scss'
interface ToggleType {
    value: string,
    onChange: () => void
}
export default function ToggleMode({ value, onChange = () => { } }: ToggleType) {
    return (
        <>
            <input id="toggle" className='toggle-input' type="checkbox" value={value} onChange={onChange} />
            <label className='toggle-mode' htmlFor="toggle">
                <img className="icon" src="/images/icon/sun.svg" alt="" />
                <img className="icon" src="/images/icon/moon.svg" alt="" />
                <div className={`circle ${value === 'dark' ? 'circle-dark-mode' : ''}`}></div>
            </label>
        </>
    )
}   