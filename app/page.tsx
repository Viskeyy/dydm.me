import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { sortBlogsByDate } from '@/helper/blogsOperation';
import { allDocuments } from 'contentlayer/generated';
import { format } from 'date-fns';
import Link from 'next/link';

export default function Home() {
    const firstPost = allDocuments[0];
    const latestFivePosts = sortBlogsByDate(allDocuments).slice(0, 5);
    const randomFivePosts = allDocuments.sort(() => Math.random() - 0.5).slice(0, 5);

    return (
        <main className='min-h-[calc(100vh-6rem)]'>
            <div className='mx-auto max-w-5xl font-mono leading-8 text-zinc-400'>
                <h1 className='text-4xl text-zinc-200'>DYDM.ME</h1>
                <br />

                <p>一个个人博客网站, 记录工作和生活中个人觉得的有趣的事物.</p>
                <br />

                <p>可以是一些技术文章, 一些博客翻译, 一些专业知识文档, 以及一些有趣的东西等.</p>
                <br />

                <p>主要是前端技术方面的内容, 偶尔也会涉及到一些数据库和网络方面的知识. 更偏向于 React 和 Next.js 等框架的内容, 其他方面也会进行补充.</p>
                <br />

                <p>这个个人博客网站主要使用了下面的技术栈:</p>
                <ul className='list-inside list-disc text-zinc-200'>
                    <li>TypeScript</li>
                    <li>Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>shadcn</li>
                    <li>Contentlayer</li>
                    <li>...</li>
                </ul>
                <br />

                <p> 网站会持续更新, 相信在长期主义的影响下, 会有意想不到的收获.</p>
                <br />

                <Card className='border-zinc-800 text-zinc-400'>
                    <CardHeader>
                        <CardTitle>最新内容</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {latestFivePosts.map((post) => {
                            return (
                                <p className='hover:cursor-pointer hover:text-zinc-200' key={post._id}>
                                    {post.title} <span className='float-end'>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                                </p>
                            );
                        })}
                    </CardContent>
                    <CardFooter>
                        <Link href='/blog' className='ml-auto hover:text-zinc-200'>
                            查看更多
                        </Link>
                    </CardFooter>
                </Card>
                <br />

                <Card className='border-zinc-800 text-zinc-400'>
                    <CardHeader>
                        <CardTitle>随便看看</CardTitle>
                    </CardHeader>
                    <CardContent className='divide-y divide-zinc-800'>
                        {randomFivePosts.map((post) => {
                            return (
                                <p className='hover:cursor-pointer hover:text-zinc-200' key={post._id}>
                                    {post.title} <span className='float-end'>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                                </p>
                            );
                        })}
                    </CardContent>
                    <CardFooter>
                        <Link href='/tags' className='ml-auto hover:text-zinc-200'>
                            查看更多
                        </Link>
                    </CardFooter>
                </Card>
                <br />

                {/*<p className='text-sm text-zinc-800'>*/}
                {/*    一个普通的程序员, 会写一些自己感兴趣的内容. 喜欢简洁美观易用的产品, 在这个博客网站中以文字记录的方式沉淀技术 / 生活 / 思考方式,*/}
                {/*</p>*/}
            </div>
        </main>
    );
}
