import { Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { removeProduct } from "../redux/cartRedux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const KEY = process.env.REACT_APP_STRIPE;



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();


  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const onToken = (token) => {
    setStripeToken(token);
  };


  const generatePDF = async () => {
    const confirmationPromise = new Promise((resolve, reject) => {
      Swal.fire({
        title: '¿Estás seguro de realizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          reject(new Error('Compra cancelada'));
        } else {
          resolve();
        }
      });
    });

    try {
      await confirmationPromise;
  
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)),
        {
          pending: 'Realizando la compra...',
          error: 'Se canceló la compra',
          hideProgressBar: true, 
        }
      );

      // Continue generating the PDF
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      const fontSize = 12;
      const lineHeight = 20;
      const margin = 50;

      let y = height - margin;

      page.drawText("Elementos del Carrito", {
        x: margin,
        y,
        size: 18,
        font: timesRomanFont,
        color: rgb(0, 0, 0.5),
      });

      y -= lineHeight * 2;

      cart.products.forEach((product) => {
        page.drawText(`Producto: ${product.title}`, {
          x: margin,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        y -= lineHeight;

        page.drawText(`ID: ${product._id}`, {
          x: margin,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        y -= lineHeight;

        page.drawText(`Tamaño: ${product.size}`, {
          x: margin,
          y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        y -= lineHeight;



        y -= lineHeight;
      });


      const pdfBytes = await pdfDoc.save();
      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      const link = document.createElement("a");
      link.href = pdfDataUri;
      link.download = "carrito.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.textDecoration = "none";
      link.style.padding = "10px";
      link.style.backgroundColor = "black";
      link.style.color = "white";
      link.style.fontWeight = "600";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Remove the cart items after generating the PDF
      cart.products.forEach((product) => {
        dispatch(removeProduct(product._id));
      });
      toast.success('Compra generada exitosamente', { autoClose: 2000 }); 
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
      console.log('Error al comprar:', error);
    }
  };



  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Tu Compra</Title>
        <Top>
          <TopButton>Seguir comprando</TopButton>
        </Top>
        {/* <Top>
          <TopButton>Seguir comprando</TopButton>
          <TopTexts>
            <TopText>Bolsa de la compra(1)</TopText>
            <TopText>Tu lista de deseos (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleConfirmPurchase}>
            CHEQUEAR AHORA
          </TopButton>
  </Top>*/}
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Producto:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Tamaño:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Delete onClick={() => handleRemoveProduct(product._id)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>RESUMEN DEL PEDIDO</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Envío estimado</SummaryItemText>
              <SummaryItemPrice>$50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Descuento de envío</SummaryItemText>
              <SummaryItemPrice>$50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={generatePDF}>Comprar</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      <ToastContainer />
    </Container>
  );
};

export default Cart;
