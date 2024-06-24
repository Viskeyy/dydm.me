export const PageTitle = ({ title }: { title: string }) => {
    return (
        <div
            className='bg-gradient-to-b from-zinc-800 to-black bg-clip-text font-mono text-[6rem] font-bold oldstyle-nums tracking-wide text-transparent subpixel-antialiased'
            style={{ WebkitTextStroke: '1px rgb(82 82 91)' }}
        >
            {title}
        </div>
    );
};

// #27272a 800
// #52525b 600
// #a1a1aa 400
