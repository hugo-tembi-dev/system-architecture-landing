import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 1rem 0;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #666;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <Logo>System Architecture</Logo>
        <NavItems>
          <NavLink href="#analytics">Analytics</NavLink>
          <NavLink href="#workflows">Workflows</NavLink>
          <NavLink href="#integrations">Integrations</NavLink>
          <NavLink href="#ontology">Ontology</NavLink>
        </NavItems>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
