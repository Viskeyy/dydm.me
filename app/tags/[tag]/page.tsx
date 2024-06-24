import { BlogList } from '@/components/BlogList';
import { PageTitle } from '@/components/PageTitle';
import { TagsCard } from '@/components/TagsCard';
import { getBlogsByTag } from '@/helper/blogsOperation';

export default function Tag({ params }: { params: { tag: string } }) {
    const documents = getBlogsByTag(params.tag);

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <PageTitle title={params.tag.toUpperCase()} />
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-1'>
                    <TagsCard activatedTag={params.tag} />
                </div>

                <div className='col-span-2'>
                    <BlogList documents={documents} />
                </div>
            </div>
        </main>
    );
}
