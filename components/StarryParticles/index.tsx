'use client';

import { ISourceOptions, type Container } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';

export const Index = () => {
    const [particlesInit, setParticlesInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setParticlesInit(true));
    }, []);

    const particlesLoaded = async (container?: Container) => {
        console.log('Index loaded', container);
    };

    const particlesOptions: ISourceOptions = useMemo(
        () => ({
            autoPlay: true,
            background: { color: '#000000', opacity: 0 },
            fpsLimit: 60,
            fullScreen: { enable: true, zIndex: -1 },
            interactivity: {
                detectsOn: 'window',
                events: {
                    onClick: { enable: true, mode: 'push' },
                    onHover: { enable: true, mode: 'grab' },
                    resize: { delay: 0.5, enable: true },
                },
                modes: {
                    grab: { distance: 100, links: { opacity: 1 } },
                    push: { default: true, quantity: 2 },
                },
            },
            particles: {
                bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
                move: {
                    angle: { offset: 0, value: 90 },
                    center: { x: 50, y: 50, mode: 'percent', radius: 0 },
                    enable: true,
                    outModes: { default: 'out' },
                    random: true,
                    speed: { min: 0.05, max: 0.1 },
                },
                number: {
                    density: { enable: true, width: 1920, height: 1080 },
                    limit: { mode: 'delete', value: 0 },
                    value: 100,
                },
                opacity: {
                    value: { min: 0.1, max: 1 },
                    animation: { enable: true, speed: { min: 0.05, max: 0.15 } },
                },
                reduceDuplicates: true,
                shape: { close: true, fill: true, type: 'circle' },
                size: { value: { min: 1, max: 3 } },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            smooth: true,
            zLayers: 100,
        }),
        [],
    );

    if (particlesInit) {
        return <Particles id='tsparticles' options={particlesOptions} particlesLoaded={particlesLoaded} />;
    }
};
