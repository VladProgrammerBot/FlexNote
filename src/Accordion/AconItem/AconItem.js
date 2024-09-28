import AconItem from './'
import AconItemForm from '../AconItemForm';
import './AconItem.scss'
import Menu from '../Menu'

import { RiPencilFill } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked, MdDeleteOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { GoCheckCircle } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

import { useEffect, useState } from 'react'

export default ({
	roadmap,
	togleCheckbox,
	addFolder,
	removeFolder,
	toggleMainFolder,
	level,
	levelColors,
	changeFolderName
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [inputValue, setInputvalue] = useState(null)

	useEffect(() => {
		if (!isOpen) {
			setIsFormOpen()
		}
	}, [isOpen])

	const ChangeFolderName = (id) => {
		changeFolderName(id, inputValue)
		setInputvalue(null)
	}

	const hasActiveChildrens = (roadmapChildrens) => {
		const checkInclude = (roadmap) => {
			return roadmap.some(child =>
				child.isChecked || checkInclude(child.childrens)
			)
		}

		const isAllIncludeChecked = (roadmap) => {
			if (roadmap.length === 0) {
				return false
			}
			return roadmap.every(child =>
				child.isChecked
			)
		}

		return {
			hasInclude: checkInclude(roadmapChildrens),
			isCheckAll: isAllIncludeChecked(roadmapChildrens)
		}
	}

	const ShowFolderForm = (id) => {
		setIsOpen(true)
		setIsFormOpen(id)
	}

	const AddNewFolder = (value) => {
		addFolder(isFormOpen, value)
		setIsFormOpen()
	}

	const menuOptions = [
		{
			name: 'Add',
			icon: <IoMdAdd />,
			action: () => ShowFolderForm(roadmap.id)
		},
		{
			name: 'Delete',
			icon: <MdDeleteOutline />,
			action: () => removeFolder(roadmap.id)
		},
		{
			name: 'Mark',
			icon: <FaStar color={`${roadmap.isMain ? 'rgb(255, 119, 119)' : 'black'}`} />,
			action: () => toggleMainFolder(roadmap)
		},
		{
			name: 'Change',
			icon: <RiPencilFill color={`${roadmap.isMain ? 'rgb(255, 119, 119)' : 'black'}`} />,
			action: () => setInputvalue(roadmap.name)
		}
	]

	return (
		<div className='acc-item'>
			<div style={{ backgroundColor: `${levelColors ? levelColors[level] : 'rgb(230, 230, 230)'}` }} className={`AccItemTitle ${roadmap.isChecked && 'checked'} ${roadmap.childrens.length === 0 && roadmap.isMain && 'mainWork'}`}>
				{inputValue !== null ? (
					<div className='changeInput'>
						<input placeholder='Enter folder name' value={inputValue} onChange={(e) => setInputvalue(e.target.value)} />
						<div className='btn' onClick={() => ChangeFolderName(roadmap.id)}>
							<IoMdAdd />
						</div>
						<div className='btn' onClick={() => ChangeFolderName(roadmap.id)}>
							<IoMdClose />
						</div>
					</div>
				) : (
					<>
						<div className={`mark ${roadmap.isMain && 'main'} ${roadmap.childrens.length === 0 && roadmap.isMain && 'mainWork'}`}></div>
						<div className='toggleBtn' onClick={() => togleCheckbox(!roadmap.isChecked, roadmap.id)}>
							{roadmap.isChecked || hasActiveChildrens(roadmap.childrens).isCheckAll ?
								<GoCheckCircle />
								: hasActiveChildrens(roadmap.childrens).hasInclude ?
									<MdOutlineRadioButtonChecked />
									:
									<MdOutlineRadioButtonUnchecked />}
						</div>
						<div className='title'>
							{roadmap.name}
						</div>
						<div className='d-flex'>
							<div
								className='toggleBtn'
								onMouseLeave={() => setIsMenuOpen(false)}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<MdMoreHoriz />
								{isMenuOpen && <Menu menuOptions={menuOptions} />}
							</div>
							<div
								className='toggleBtn'
								onClick={() => setIsOpen(!isOpen)}
							>
								{roadmap.childrens.length ? (isOpen ? <FaAngleUp /> : <FaAngleDown />) : null}
							</div>
						</div>
					</>
				)}
			</div>
			{isFormOpen && isOpen && <AconItemForm AddNewFolder={AddNewFolder} />}
			{roadmap.childrens.length > 0 && roadmap.childrens && isOpen && (
				<div>
					{roadmap.childrens.map((folder) => {
						return (
							<AconItem
								key={folder.id}
								roadmap={folder}
								togleCheckbox={togleCheckbox}
								addFolder={addFolder}
								removeFolder={removeFolder}
								toggleMainFolder={toggleMainFolder}
								level={level + 1}
								levelColors={levelColors}
								changeFolderName={changeFolderName}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
