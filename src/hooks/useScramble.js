import { useRef, useState, useEffect } from 'react';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const useScramble = (text, speed = 30) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const intervalRef = useRef(null);

    const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, speed);
    };

    useEffect(() => {
        scramble(); // Scramble on mount
        return () => clearInterval(intervalRef.current);
    }, [text]);

    return { displayText, scramble };
};
