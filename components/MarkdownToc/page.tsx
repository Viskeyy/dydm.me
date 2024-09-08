'use client';
import { useRouter } from 'next/navigation';
import { fromMarkdown } from 'react-markdown-toc';
import { TOC } from 'react-markdown-toc/client';

export const MarkdownTOC = ({ markdownString }: { markdownString: string }) => {
    const router = useRouter();
    const toc = fromMarkdown(markdownString);
    return (
        <TOC
            toc={toc}
            scrollAlign='start'
            renderList={(children) => (
                // <CollapsibleContent className='data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden pl-4'>
                //     {children}
                // </CollapsibleContent>
                <span>
                    {children} <br />
                </span>
            )}
            // renderListItem={(children, open) => <Collapsible open={open}>{children}</Collapsible>}
            renderListItem={(children, open) => (
                <span>
                    {children}
                    <br />
                </span>
            )}
            renderLink={(children, href, active) => (
                <span>
                    {children}
                    <br />
                </span>
                // <CollapsibleTrigger>
                //     <span
                //         data-active={active}
                //         role='button'
                //         onClick={() => {
                //             router.push(href, { scroll: false });
                //             const target = document.querySelector(href);
                //             target?.scrollIntoView({ behavior: 'smooth' });
                //         }}
                //     >
                //         {children}
                //     </span>
                // </CollapsibleTrigger>
            )}
        />
    );
};
