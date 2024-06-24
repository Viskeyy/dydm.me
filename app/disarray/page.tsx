import { BlogList } from '@/components/BlogList';
import { getBlogsByType } from '@/helper/blogsOperation';
import { PageTitle } from 'components/PageTitle';

export default function Disarray() {
    const disarray = getBlogsByType('DisarrayDocument');

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <PageTitle title={'Disarray'} />

            <BlogList documents={disarray} />
        </main>
    );
}
