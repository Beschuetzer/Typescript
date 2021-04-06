
const button = document.querySelector('button');
if (button) {
	button.addEventListener('click', handleClick.bind(null, 'You clicked the button'));
}

function handleClick(msg: string) {
	console.log(msg);
}
