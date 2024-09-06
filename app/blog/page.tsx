import { getBlogsByYear } from '@/helper/blogsOperation';
import { PageTitle } from 'components/PageTitle';
import { PostCards } from 'components/PostCard';

export default function Blog() {
    const years = ['2024', '2023', '2022', '2021'];

    return (
        <main className='min-h-[calc(100vh-10rem)]'>
            {years.map((year) => (
                <div key={year}>
                    <PageTitle title={year} />
                    <PostCards posts={getBlogsByYear(year)} />
                </div>
            ))}
        </main>
    );
}
