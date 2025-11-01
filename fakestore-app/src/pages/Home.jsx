// import { Container, Row, Col, Button } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom'
// import { Link } from "react-router-dom";

// export default function Home() {
//     return (

//         <Row className="justify-content-center">
//             <Col className="text-center">
//                 <h1 className="mb-3">Welcome to MyFake</h1>
//                 <p className="lead">Demo E-comm site built with React, React Router,
//                     and React-Bootstrap using the FakeStore API.
//                 </p>
//                 <Button as={Link} to="/products" size="lg">Browse Products</Button>
//             </Col>
//             <Col md={5} className="text-md-end py-4">
//                 <img
//                     src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
//                     alt="Shopping"
//                     className="img-fluid rounded shadow"
//                 />
//             </Col>
//         </Row>

//     )
// }

import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <Container className="py-4">
            <Row className="mt-4">
                <Col>
                    <Carousel>

                        {/* Slide 1 — Portrait */}
                        <Carousel.Item>
                            <div className="carousel-frame">
                                <img
                                    className="d-block w-100 slide-img tall-img"
                                    src="https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17057883_37_D3.jpg?ts=1761304041312&im=SmartCrop,width=960,height=1344&imdensity=1"
                                    alt="Mango Fashion 1"
                                />
                            </div>
                            <Carousel.Caption style={{ textShadow: "2px 2px black" }}>
                                <h3>Bold & Stylish</h3>
                                <p>Dress to impress with Mango.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Slide 2 — Wide */}
                        <Carousel.Item>
                            <div className="carousel-frame">
                                <img
                                    className="d-block w-100 slide-img wide-img"
                                    src="https://n.nordstrommedia.com/is/image/nordstrom/mango_1025_v05235a_007-1.jpeg?width=1600&dpr=2&crop=3200:1600,offset-x100,offset-y50"
                                    alt="Mango Fashion 2"
                                />
                            </div>
                            <Carousel.Caption style={{ textShadow: "2px 2px black" }}>
                                <h3>Comfort Meets Class</h3>
                                <p>Every outfit tells a story.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        {/* Slide 3 — Portrait */}
                        <Carousel.Item>
                            <div className="carousel-frame">
                                <img
                                    className="d-block w-100 slide-img tall-img"
                                    src="https://leorana.com/cdn/shop/files/1_d169ad71-8e27-4351-a1d9-127cddc478ba.png?v=1758964405&width=750"
                                    alt="Mango Fashion 3"
                                />
                            </div>
                            <Carousel.Caption style={{ textShadow: "2px 2px black" }}>
                                <h3>Fresh Fits Daily</h3>
                                <p>Discover a new look today.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}