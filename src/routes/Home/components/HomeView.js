import React from 'react'
import DuckImage from '../assets/Duck.jpg'
	//import classes from './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>frontpage!</h4>
		<ul className='list-group'>
			<li className='list-group-item'><a value='1' onClick={selectlifter(1)}> hallo </a> </li>
		</ul>
  </div>
)

export default HomeView
