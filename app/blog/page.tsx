import { getBlogsByYear } from '@/helper/blogsOperation';
import { PageTitle } from 'components/PageTitle';
import { PostCards } from 'components/PostCard';

export default function Blog() {
    const posts21 = getBlogsByYear('2021');
    const posts24 = getBlogsByYear('2024');

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <div>
                <PageTitle title='2024' />
                <PostCards posts={posts24} />
            </div>
            <div>
                <PageTitle title='2021' />
                <PostCards posts={posts21} />
            </div>
        </main>
    );
}
