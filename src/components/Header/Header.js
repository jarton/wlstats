import React from 'react'
import { IndexLink, Link } from 'react-router'
	//import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>WL STATS</h1>
    <IndexLink to='/'>
    	Hjem
    </IndexLink>
		<Link to={'/lifter'}>
			lofter
		</Link>
		<Link to={'/meets'}>
			stevner	
		</Link>
  </div>
)

export default Header
