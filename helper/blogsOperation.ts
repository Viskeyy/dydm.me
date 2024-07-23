import { allDocuments, DocumentTypes } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

export const getBlogsByYear = (year: string) => {
    const blogs = allDocuments.filter((blog) => format(new Date(blog.date), 'yyyy') === year);
    return sortBlogsByDate(blogs);
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

const sortBlogsByDate = (blogs: DocumentTypes[]) => {
    return blogs.sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
};
