import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

export const PostCards = ({ posts }: { posts: any[] }) => {
    return (
        <main className='grid grid-cols-3 gap-4'>
            {posts.map((post: any) => (
                <Card key={post._id} className='p-4'>
                    <p className='text-lg'>{post.title}</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p className='overflow-clip text-ellipsis text-nowrap text-zinc-400'>{post?.summary ?? '......'}</p>
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
