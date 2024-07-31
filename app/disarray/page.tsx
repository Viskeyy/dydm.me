import { getBlogsByType } from '@/helper/blogsOperation';
import { PageTitle } from 'components/PageTitle';
import { PostList } from 'components/PostList';

export default function Disarray() {
    const disarray = getBlogsByType('DisarrayPost');

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <PageTitle title={'Disarray'} />

            <PostList posts={disarray} />
        </main>
    );
}
