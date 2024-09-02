import { Button } from '@/components/ui/button';
import GithubLogo from '@/public/github.svg';
import HomeLogo from '@/public/home.svg';
import Link from 'next/link';

export const GlobalHeader = () => {
    const routes = [
        { name: 'Blog', path: '/blog' },
        { name: 'Tags', path: '/tags' },
        { name: 'Disarray', path: '/disarray' },
    ];

    return (
        <header className='fixed left-0 top-0 flex w-full items-center justify-between bg-transparent p-4'>
            <Link href='/'>
                <Button variant='ghost' className='text-base'>
                    <HomeLogo />
                </Button>
            </Link>

            <nav className='flex items-center'>
                {routes.map((route) => (
                    <Link key={route.path} href={route.path}>
                        <Button variant='ghost' className='text-base'>
                            {route.name}
                        </Button>
                    </Link>
                ))}

                <a href='https://github.com/Viskeyy' target='_blank' rel='noopener noreferrer'>
                    <Button variant='ghost'>
                        <GithubLogo />
                    </Button>
                </a>
            </nav>
        </header>
    );
};
