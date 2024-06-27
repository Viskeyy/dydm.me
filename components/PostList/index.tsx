import { Card } from '@/components/ui/card';
import { getBlogsUrlByType } from '@/helper/blogsOperation';
import { format } from 'date-fns';
import Link from 'next/link';

export const PostList = ({ posts }: { posts: any[] }) => {
    return (
        <Card className='w-full divide-y divide-zinc-800 border-zinc-800 px-8 py-4'>
            {posts.map((post) => {
                const { title, summary, date, _id, slug, type } = post;

                return (
                    <div key={_id} className='py-4'>
                        <div className='text-lg text-zinc-400 hover:cursor-pointer hover:text-white'>
                            <Link href={getBlogsUrlByType(type, slug)} className='flex justify-between'>
                                <p className='overflow-hidden text-ellipsis whitespace-nowrap'>{title}</p>
                                <p className='whitespace-nowrap'>{format(new Date(date), 'yyyy-MM-dd')}</p>
                            </Link>
                        </div>
                        {summary && <p className='overflow-hidden text-ellipsis whitespace-nowrap text-zinc-600'>{summary}</p>}
                    </div>
                );
            })}
        </Card>
    );
};
