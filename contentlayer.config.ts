import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files';
import { writeFileSync } from 'fs';
import { slug } from 'github-slugger';
import remarkGfm from 'remark-gfm';

const isProduction = process.env.NODE_ENV === 'production';

const createTags = (allDocuments: any[]) => {
    const tagsCount: Record<string, number> = {};

    allDocuments.forEach((doc) => {
        if (doc.tags && !isProduction) {
            doc.tags.forEach((tag: string) => {
                const formattedTag = slug(tag);

                if (formattedTag in tagsCount) {
                    tagsCount[formattedTag] += 1;
                } else {
                    tagsCount[formattedTag] = 1;
                }
            });
        }
    });

    writeFileSync('./tags-data.json', JSON.stringify(tagsCount));
};

const createSlugs: ComputedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
};

export const DefaultPost = defineDocumentType(() => ({
    name: 'DefaultPost',
    filePathPattern: 'data/*.md',
    contentType: 'markdown',
    fields: {
        date: { type: 'date', required: true },
        summary: { type: 'string', required: false },
        tags: { type: 'list', of: { type: 'string' }, required: true, default: [] },
        title: { type: 'string', required: true },
    },
    computedFields: {
        ...createSlugs,
        url: { type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath}` },
    },
}));

export const DisarrayPost = defineDocumentType(() => ({
    name: 'DisarrayPost',
    filePathPattern: 'data/disarray/*.md',
    contentType: 'markdown',
    fields: {
        date: { type: 'date', required: true },
        summary: { type: 'string', required: false },
        tags: { type: 'list', of: { type: 'string' }, required: true, default: [] },
        title: { type: 'string', required: true },
    },
    computedFields: {
        ...createSlugs,
        url: { type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath}` },
    },
}));

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [DefaultPost, DisarrayPost],
    markdown: { remarkPlugins: [remarkGfm] },
    onSuccess: async (importData) => {
        const { allDocuments } = await importData();
        // createTags(allDocuments);
    },
});
