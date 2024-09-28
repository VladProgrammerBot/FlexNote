import Accordion from '../Accordion'
import './App.scss'
import { useState } from 'react'

export default () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<div className='app'>
			<Accordion 
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
			/>
		</div>
	)
}
