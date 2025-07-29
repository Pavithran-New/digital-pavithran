import React from 'react';
import styled from 'styled-components';
import { Header } from '../../component/header_footer/header';
// Import the image directly
import productImage from '../../images/product.jpeg';
import { Link } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  padding: 2rem;
`;

const Row = styled.div`
//   display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  padding: 1rem;
//   max-width: 50%;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const Review = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const PriceLabel = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  color: #e74c3c;
`;

const Info = styled.div`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Features = styled.ul`
  margin-bottom: 1rem;
  padding-left: 0;
  list-style-type: none;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Specialty = styled.div`
  margin-bottom: 1rem;
`;

const Care = styled.div`
  margin-bottom: 1rem;
`;

const Disclaimer = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

// Data Arrays
const productImages = [productImage]; // Use the imported image directly

const categories = [
  'Home and Living',
  'Home Decor and Utilities'
];

const salientFeatures = [
  'Item Type: Handicraft',
  'Size: Onesize',
  'Dimensions (in cm): 12x12x30',
  'Color: Blue',
  'Occasion: Casual',
  'State of Origin: Uttar Pradesh',
  'Sold by: Maya Products'
];

const priceDetails = [
  { label: 'IN STOCK', price: '₹1,149.00' }
];

const infoDetails = [
  { label: 'SKU#:', value: 'UTT65219250' },
  { label: 'Product Category:', value: categories.join(', ') },
  { label: 'Product Type:', value: 'Home Decor and Utilities' }
];

const Product = () => {
  return (
    <Container>
      <Header label="Product" />
      <Row>
        {/* Product Image */}
        <Column>
          {productImages.map((image, index) => (
            <Img key={index} src={image} alt="Handmade Ceramic Hand-Painted Flower Vase" />
          ))}
        </Column>

        {/* Product Details */}
        <Column>
          <Title>Hand-Painted Ceramic Vase Flower Vase</Title>
          <Review>Be the first to review this product</Review>

          {priceDetails.map((detail, index) => (
            <PriceContainer key={index}>
              <button style={{ backgroundColor: 'lightblue', border: 'none', padding: '0.5rem', borderRadius: '5px' }}>
                <PriceLabel>{detail.label}</PriceLabel>
              </button>
              <Price>{detail.price}</Price>
            </PriceContainer>
          ))}

          <Info>
            {infoDetails.map((info, index) => (
              <p key={index}><strong>{info.label}</strong> {info.value}</p>
            ))}
          </Info>

          <Description>
            Elevate your home décor with the Handmade Ceramic Hand-Painted Flower Vase, available exclusively at ETHICRAZE. Embrace the craftsmanship of Uttar Pradesh artisans and add a touch of artistic flair to your living space. Bring home this functional piece of art today and let its beauty bloom in your home.
          </Description>

          <Features>
            <h3>Salient Features:</h3>
            {salientFeatures.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </Features>

          <Specialty>
            <h3>Details:</h3>
            <p>Transform your living space with the Handmade Ceramic Hand-Painted Flower Vase from Uttar Pradesh. Crafted with care and adorned with intricate hand-painted designs, this vase is not just a decorative piece but a symbol of traditional craftsmanship. Perfect for displaying fresh flowers or enhancing any room's ambiance, it's a must-have for those who appreciate artistry and elegance.</p>
          </Specialty>

          <Specialty>
            <h3>Specialty:</h3>
            Behold the exquisite beauty of our Handmade Ceramic Hand-Painted Flower Vase, a testament to the rich artistic heritage of Uttar Pradesh. Standing at 30 cm tall with dimensions of 12x12 cm, this vase is crafted by skilled artisans using traditional pottery techniques. Each piece is a unique work of art, hand-painted with intricate designs that add a touch of traditional charm and elegance to any room.
          </Specialty>

          <Care>
            <h3>How to Care:</h3>
            Handle this exquisite vase with care to maintain its pristine beauty. Clean gently with a soft cloth to preserve the hand-painted designs and glossy finish. Avoid exposure to direct sunlight to prevent fading of the vibrant colors. Whether displayed with fresh flowers or as a standalone piece, this vase promises to enhance your home décor with its timeless appeal.
          </Care>

          <Disclaimer>
            <h3>Disclaimer:</h3>
            <strong>PRODUCT DISCLAIMER:</strong> This product is handmade and may have slight variations or dissimilarities that are a natural outcome of the human involvement in the process. These minor variations of Stitches/Motifs add to its charm and ensure its uniqueness & authenticity.
            <br />
            <strong>PRODUCT QUALITY DISCLAIMER:</strong> All the sellers on boarded here are thoroughly verified weavers, artisans, societies, and producer companies. All the sellers in Ethicraze have agreed to sell authentic and handmade products only. All the responsibility regarding the quality/authenticity of the product lies with the sellers.
          </Disclaimer>
        </Column>
      </Row>
      <Link to={'/AddProduct'}>
      <button className="btn btn-dark w-75 text-white" style={{ backgroundColor: '#501924', borderRadius: '5px', marginTop: '40%', marginLeft: '10%' }}>
        EDIT
      </button></Link>
    </Container>
  );
};

export default Product;
  