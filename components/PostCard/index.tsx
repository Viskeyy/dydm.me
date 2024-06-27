import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getBlogsUrlByType } from '@/helper/blogsOperation';
import { format } from 'date-fns';
import Link from 'next/link';

export const PostCards = ({ posts }: { posts: any[] }) => {
    return (
        <main className='grid grid-cols-3 gap-4'>
            {posts.map((post: any) => (
                <Card key={post._id} className='relative p-4 text-zinc-400'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={getBlogsUrlByType(post.type, post.slug)}>
                                    <p className='overflow-hidden text-ellipsis whitespace-nowrap text-lg'>{post.title}</p>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className='max-w-xs text-zinc-400' side='bottom'>
                                {post.title}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p className='overflow-clip text-ellipsis text-nowrap text-zinc-600'>{post?.summary ?? '......'}</p>
                            </TooltipTrigger>
                            <TooltipContent className='max-w-xs text-zinc-400' side='bottom'>
                                {post.summary ?? 'No summary provided'}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <p className='text-right text-sm'>{format(new Date(post.date), 'yyyy-MM-dd')}</p>
                </Card>
            ))}
        </main>
    );
};
