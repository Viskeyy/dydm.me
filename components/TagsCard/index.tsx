import { Button } from '@/components/ui/button';
import tagData from '@/tags-data.json';
import Link from 'next/link';

export const TagsCard = ({ activatedTag }: { activatedTag?: string }) => {
    const tagCounts = tagData as Record<string, number>;
    const tagKeys = Object.keys(tagCounts);
    const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

    return (
        <div className='flex flex-wrap gap-4'>
            {sortedTags.map((tag) => (
                <Button
                    key={tag}
                    variant='outline'
                    className={`border-zinc-800 text-zinc-400 hover:bg-transparent ${tag === activatedTag ? 'border-zinc-400 text-white' : ''}`}
                >
                    <Link href={`/tags/${tag}`}>
                        {tag.toUpperCase()} &nbsp; [{tagCounts[tag]}]
                    </Link>
                </Button>
            ))}
        </div>
    );
};
