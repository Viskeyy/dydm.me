import { allDocuments } from 'contentlayer/generated';
import { format } from 'date-fns';

export const getBlogsByYear = (year: string) => {
    return allDocuments.filter((doc) => format(new Date(doc.date), 'yyyy') === year);
};

export const getBlogsByTag = (tag: string) => {
    return allDocuments.filter((doc) => doc.tags.includes(tag));
};

export const getBlogsByType = (type: string) => {
    return allDocuments.filter((doc) => doc.type === type);
};

export const getBlogsUrlByType = (type: string, slug: string) => {
    switch (type) {
        case 'DefaultDocument':
            return `/blog/${slug}`;
        case 'DisarrayDocument':
            return `/blog/disarray/${slug}`;
        default:
            return `/blog/${slug}`;
    }
};
