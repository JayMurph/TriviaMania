import React from "react";
import { Nav, NavLink, NavMenu, Header, Title } from "./NavbarElements";

const Navbar = () => {
return (
	<Header>
		<Title>Trivia Mania</Title>
		<Nav>
			<NavMenu>
			<NavLink to="/about" activeStyle>
				About
			</NavLink>
			<NavLink to="/login" activeStyle>
				Login
			</NavLink>
			<NavLink to="/sign-up" activeStyle>
				Sign Up
			</NavLink>
			</NavMenu>
		</Nav>
	</Header>
	);
};

export default Navbar;
