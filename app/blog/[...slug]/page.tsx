import { allDocuments } from 'contentlayer/generated';
import { format } from 'date-fns';

export default function Page({ params }: { params: { slug: string[] } }) {
    const currentDocument = allDocuments.find((doc) => doc.slug === params.slug[params.slug.length - 1]);

    return (
        <main className='mx-auto min-h-[calc(100vh-10rem)] w-[60vw]'>
            <p className='text-sm text-zinc-400'>{currentDocument?.summary}</p>

            <div className='my-8 text-lg text-zinc-400'>
                <span>{currentDocument?.tags.join(' ').toUpperCase()}</span>
                <span className='float-right'>{format(new Date(currentDocument?.date as string), 'yyyy-MM-dd')}</span>
            </div>

            <article className='prose prose-base mx-auto min-w-[60vw]' dangerouslySetInnerHTML={{ __html: currentDocument?.body.html ?? '' }} />
        </main>
    );
}
