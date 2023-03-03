import React, { useEffect } from 'react'
import { Layout } from '../../global/Layout/Layout';
import "./News.scss"
import { PostItem } from './PostItem/PostItem';
import { newsBanner } from '../../../utils/dataConfig';
function News() {
    useEffect(() => {
        document.title = "Tin Tức";
    });
    const { title, items } = newsBanner;
    return (
        <div className="news">
            <Layout>
                <PostItem title={title} items={items} />
            </Layout>
        </div>
    );
}
export default News;
