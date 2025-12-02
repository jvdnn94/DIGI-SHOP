import React from 'react'
export interface IProductItemes {
    id?: string,
    image: string,
    title: string | number,
    description: string,
    price: number | string,
    category?: string;
    title_en?:string

}

function ProductComp({ image, title, price}: IProductItemes) {
    return (
        <div className=' h-84 px-2 py-4 my-4 mx-1'>
            <div className='shadow-md rounded-2xl'>
                <img src={image}
                    alt="bird"
                    className='h-40 mx-auto hover:opacity-90 rounded-md'
                />
            </div>

            <div className='p-2 text-right' dir='rtl'>
                <h1>{title}</h1>

                <p>قیمت: <span>{price}</span> تومان</p>
            </div>


        </div>
    )
}


export default ProductComp
