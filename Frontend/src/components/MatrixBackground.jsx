import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/\\*&^%$#@!";
        const matrix = letters.split("");

        const fontSize = 16;
        const columns = width / fontSize;

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0F0"; // Neon Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];

                // Add some randomness to colors for "glitch" effect (mostly green, sometimes white/purple)
                const randomColor = Math.random() > 0.98 ? "#FFF" : "#22c55e"; // Green-500
                ctx.fillStyle = randomColor;

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0"
        />
    );
};

export default MatrixBackground;
