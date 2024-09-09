import { allDocuments } from 'contentlayer/generated';
import { format } from 'date-fns';
import { TOC } from 'react-markdown-toc/server';

export default function Page({ params }: Readonly<{ params: { slug: string[] } }>) {
    const currentDocument = allDocuments.find((doc) => doc.slug === params.slug[params.slug.length - 1]);

    if (!currentDocument) {
        return <main className='mx-auto min-h-[calc(100vh-10rem)] w-[60vw] text-center'> Document not found </main>;
    }

    return (
        <main className='mx-auto min-h-[calc(100vh-10rem)] w-[60vw]'>
            <div className='text-lg text-zinc-400'>
                <span>{currentDocument?.tags.join(' ').toUpperCase()}</span>
                <span className='float-right'>{format(new Date(currentDocument?.date), 'yyyy-MM-dd')}</span>
            </div>

            <p className='my-8 text-sm text-zinc-400'>{currentDocument?.summary}</p>

            <div className='relative flex justify-between gap-16'>
                <article className='prose prose-base min-w-[40vw]' dangerouslySetInnerHTML={{ __html: currentDocument?.body.html ?? '' }} />

                <div className='sticky top-16 h-fit'>
                    <TOC markdown={currentDocument?.body.raw ?? ''} className='ml-4 text-zinc-400' ul='pl-4' />
                </div>
            </div>
        </main>
    );
}
