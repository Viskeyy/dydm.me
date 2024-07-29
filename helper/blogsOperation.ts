import { allDocuments, DocumentTypes } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

export const getBlogsByYear = (year: string) => {
    const blogs = allDocuments.filter((blog) => format(new Date(blog.date), 'yyyy') === year);
    return sortBlogsByDate(blogs);
};

export const getBlogsByTag = (tag: string) => {
    const blogs = allDocuments.filter((blog) => blog.tags.includes(tag));
    return sortBlogsByDate(blogs);
};

export const getBlogsByType = (type: string) => {
    const blogs = allDocuments.filter((blog) => blog.type === type);
    return sortBlogsByDate(blogs);
};

export const getBlogsUrlByType = (type: string, slug: string) => {
    switch (type) {
        case 'DefaultPost':
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
