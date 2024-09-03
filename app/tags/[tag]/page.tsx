import { PageTitle } from '@/components/PageTitle';
import { TagsCard } from '@/components/TagsCard';
import { getBlogsByTag } from '@/helper/blogsOperation';
import { PostList } from 'components/PostList';

export default function Tag({ params }: Readonly<{ params: { tag: string } }>) {
    const posts = getBlogsByTag(params.tag);

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <PageTitle title={params.tag.toUpperCase()} />
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-1'>
                    <TagsCard activatedTag={params.tag} />
                </div>

                <div className='col-span-2'>
                    <PostList posts={posts} />
                </div>
            </div>
        </main>
    );
}
