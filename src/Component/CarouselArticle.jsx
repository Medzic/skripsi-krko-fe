import React from 'react'
import image1 from '../Asset/Desktop - 23.png'
import image2 from '../Asset/Desktop - 24.png'
import image3 from '../Asset/Desktop - 25.png'
import Carousel from 'react-bootstrap/Carousel';

const CarouselArticle = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={image1}
                    alt=''
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt=''
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={image3}
                    alt=''
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselArticle