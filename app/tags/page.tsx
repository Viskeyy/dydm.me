import { TagsCard } from '@/components/TagsCard';
import { PageTitle } from 'components/PageTitle';

export default function Tags() {
    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <PageTitle title={'Tags'} />
            <TagsCard />
        </main>
    );
}
