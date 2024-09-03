import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBlogsUrlByType } from '@/helper/blogsOperation';
import { DocumentTypes } from 'contentlayer/generated';
import { format } from 'date-fns';
import Link from 'next/link';

export const HomeCard = ({ title, posts, href }: { title: string; posts: DocumentTypes[]; href: string }) => {
    return (
        <Card className='border-zinc-800 text-zinc-400'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {posts.map((post) => (
                    <p className='hover:cursor-pointer hover:text-zinc-200' key={post._id}>
                        <Link href={getBlogsUrlByType(post.type, post.slug)}>
                            {post.title} <span className='float-end'>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                        </Link>
                    </p>
                ))}
            </CardContent>
            <CardFooter>
                <Link href={href} className='ml-auto hover:text-zinc-200'>
                    查看更多
                </Link>
            </CardFooter>
        </Card>
    );
};
