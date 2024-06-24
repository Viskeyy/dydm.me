import { getBlogsByYear } from '@/helper/blogsOperation';
import { PageTitle } from 'components/PageTitle';
import { PostCards } from 'components/PostCards';

export default function Blog() {
    const posts21 = getBlogsByYear('2021');

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <PageTitle title='2021' />
            <PostCards posts={posts21} />
        </main>
    );
}
