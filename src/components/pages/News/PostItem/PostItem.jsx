import React from 'react'
import "./PostItem.scss";
import { NewsBanner } from '../../../global/NewsBanner/NewsBanner';
export const PostItem = (data) => {
    const { items } = data;
    return (
        <div className="news">
            <div className="container">
                <div className="wrapper">
                    <div className="">
                        {items.map((datas, index) => (
                            <NewsBanner data={datas} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
