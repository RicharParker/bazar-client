import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer> 
        <Filter>
          <FilterText>Filtrar Productos:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>Blanco</Option>
            <Option>Negro</Option>
            <Option>Rojo</Option>
            <Option>Azul</Option>
            <Option>Amarillo</Option>
            <Option>Verde</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Tamaño</Option>
            <Option>EC</Option>
            <Option>C</Option>
            <Option>M</Option>
            <Option>G</Option>
            <Option>EG</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Ordenar Productos:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Lo más nuevo</Option>
            <Option value="asc">Lo más vendido</Option>
            <Option value="desc">Lo más escolar</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
