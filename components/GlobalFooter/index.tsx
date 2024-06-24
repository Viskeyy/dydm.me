import Image from 'next/image';

export const GlobalFooter = () => (
    <footer className='py-4'>
        <div className='flex items-center justify-center gap-4'>
            <a
                className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
                href='https://vercel.com'
                target='_blank'
                rel='noopener noreferrer'
            >
                Deployed By <Image src='/vercel.svg' alt='Vercel Logo' className='dark:invert' width={100} height={24} priority />
            </a>
        </div>
    </footer>
);
