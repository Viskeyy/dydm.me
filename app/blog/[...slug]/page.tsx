import { allDocuments } from 'contentlayer/generated';
import { format } from 'date-fns';

export default function Page({ params }: { params: { slug: string[] } }) {
    const currentDocument = allDocuments.find((doc) => doc.slug === params.slug[params.slug.length - 1]);

    return (
        <main className='mx-auto min-h-[calc(100vh-6rem)] w-[60vw]'>
            <h1 className='my-4 text-center text-5xl font-bold text-zinc-200'>{currentDocument?.title}</h1>
            <p className='text-lg text-zinc-400'>{currentDocument?.summary}</p>
            <div className='mb-8 text-lg text-zinc-400'>
                <span>{currentDocument?.tags.join(' ').toUpperCase()}</span>
                <span className='float-right'>{format(new Date(currentDocument?.date as string), 'yyyy-MM-dd')}</span>
            </div>

            <article className='prose prose-base mx-auto min-w-[60vw]' dangerouslySetInnerHTML={{ __html: currentDocument?.body.html ?? '' }} />
        </main>
    );
}
