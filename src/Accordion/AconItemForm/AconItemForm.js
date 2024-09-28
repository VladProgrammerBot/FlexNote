import './AconItemForm.scss'
import { IoMdAdd } from "react-icons/io";

import { useState } from 'react';

export default ({AddNewFolder}) => {
	const [inputValue, setInputValue] = useState([])

	return (
		<div className='acc-item1'>
			<input placeholder='Enter folder name' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
			<div className='btn' onClick={()=>AddNewFolder(inputValue)}>
				<IoMdAdd/>
			</div>
		</div>
	)
}