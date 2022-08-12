import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        slickPlay: true
      };
      return (
        <Slider {...settings}>
          <img src="https://2.bp.blogspot.com/-3h40l-jH11g/Wb2ImcA2haI/AAAAAAAA2mA/39QjvPoacnIy8F2uQcnU3IINuJFCiYV0gCLcBGAs/s1600/promocao-60-anos-editora-zahar-mais-de-60-titulos-com-descontos-de-ate-85-por-cento.jpg" />
          <img src="https://gennegociosegestao.com.br/wp-content/uploads/2020/04/banner-maratonar-livros-770x313.jpg" />
          <img src="https://scontent-gru2-1.xx.fbcdn.net/v/t1.6435-9/107718546_101713804953354_9176950746915739225_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-7&_nc_sid=dd9801&efg=eyJpIjoidCJ9&_nc_ohc=yO161Y9rvCMAX8BxpRh&_nc_ht=scontent-gru2-1.xx&oh=00_AT9ZNZAvX54hE4vK9zcsrAGQGKhFSAxFw5v0-eOMnxwKIg&oe=631D9092" />
        </Slider>
      );
}

export default HomeSlider;

// import React, { Component } from "react";
// import Slider from "react-slick";


// export default class AsNavFor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nav1: null,
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       nav1: this.slider1,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Slider
//           ref={slider => (this.slider1 = slider)}
//         >
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>

//       </div>
//     );
//   }
// }


        // <Slider {...settings}>
        //     <img src="https://2.bp.blogspot.com/-3h40l-jH11g/Wb2ImcA2haI/AAAAAAAA2mA/39QjvPoacnIy8F2uQcnU3IINuJFCiYV0gCLcBGAs/s1600/promocao-60-anos-editora-zahar-mais-de-60-titulos-com-descontos-de-ate-85-por-cento.jpg" />
        //     <img src="https://gennegociosegestao.com.br/wp-content/uploads/2020/04/banner-maratonar-livros-770x313.jpg" />
        //     <img src="https://scontent-gru2-1.xx.fbcdn.net/v/t1.6435-9/107718546_101713804953354_9176950746915739225_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-7&_nc_sid=dd9801&efg=eyJpIjoidCJ9&_nc_ohc=yO161Y9rvCMAX8BxpRh&_nc_ht=scontent-gru2-1.xx&oh=00_AT9ZNZAvX54hE4vK9zcsrAGQGKhFSAxFw5v0-eOMnxwKIg&oe=631D9092" />
        // </Slider>