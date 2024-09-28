import './Menu.scss'

export default ({
	menuOptions
}) => {
	return (
		<div className="menu">
			{menuOptions.map((option, index) => {
				return (
					<div onClick={option.action} key={index}>
						<div>{option.icon}</div>
						<div>{option.name}</div>
					</div>
				)
			})}

		</div>
	)
}