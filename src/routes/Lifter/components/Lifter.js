import React from 'react'

export const Lifter = (props) => (
  <div>
		<h2>Counter </h2>
    <button className='btn btn-default' onClick={props.selectlifter}>
    	lifter 1
    </button>
  </div>
)

Lifter.propTypes = {
	//lifter: React.PropTypes.object.isRequired,
  selectlifter: React.PropTypes.func.isRequired
}

export default Lifter 
