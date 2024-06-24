import { Card } from '@/components/ui/card';
import { getBlogsUrlByType } from '@/helper/blogsOperation';
import { format } from 'date-fns';
import Link from 'next/link';

export const BlogList = ({ documents }: { documents: any[] }) => {
    return (
        <Card className='w-full divide-y divide-zinc-800 border-zinc-800 px-8 py-4'>
            {documents.map((doc) => {
                const { title, summary, date, _id, slug, type } = doc;

                return (
                    <div key={_id} className='py-4'>
                        <p className='text-lg text-zinc-400 hover:cursor-pointer hover:text-white'>
                            <Link href={getBlogsUrlByType(type, slug)}>
                                {title} <span className='float-right'>{format(new Date(date), 'yyyy-MM-dd')}</span>
                            </Link>
                        </p>
                        {summary && <p className='text-zinc-600'>{summary}</p>}
                    </div>
                );
            })}
        </Card>
    );
};
