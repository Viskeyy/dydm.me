import { MarkdownTOC } from '@/components/MarkdownToc/page';
import { allDocuments } from 'contentlayer/generated';
import { format } from 'date-fns';

export default function Page({ params }: Readonly<{ params: { slug: string[] } }>) {
    const currentDocument = allDocuments.find((doc) => doc.slug === params.slug[params.slug.length - 1]);

    if (!currentDocument) {
        return <div>Document not found</div>;
    }

    return (
        <main className='mx-auto min-h-[calc(100vh-10rem)] w-[60vw]'>
            <p className='text-sm text-zinc-400'>{currentDocument?.summary}</p>

            <MarkdownTOC markdownString={currentDocument?.body.raw ?? ''} />

            <div className='my-8 text-lg text-zinc-400'>
                <span>{currentDocument?.tags.join(' ').toUpperCase()}</span>
                <span className='float-right'>{format(new Date(currentDocument?.date), 'yyyy-MM-dd')}</span>
            </div>

            <article className='prose prose-base mx-auto min-w-[60vw]' dangerouslySetInnerHTML={{ __html: currentDocument?.body.html ?? '' }} />
        </main>
    );
}
