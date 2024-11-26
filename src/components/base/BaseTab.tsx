import React from 'react';

interface TabType {
    name: string;
}

export default function BaseTab({ name }: TabType) {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const RandomColorBox = () => {
        const randomColor = getRandomColor();
        const rgbaBackgroundColor = `${randomColor}2A`;
        return { color: randomColor, background: rgbaBackgroundColor };
    };

    const style = RandomColorBox();

    return (
        <div style={{ color: style.color, backgroundColor: style.background }} className='py-[2px] px-[10px] text-sm font-medium leading-5 rounded-full'>
            {name}
        </div>
    );
}