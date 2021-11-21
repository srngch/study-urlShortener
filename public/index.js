const APT_SERVER = 'http://localhost:3000';

const $longUrl = document.querySelector('#longUrl');
const $submit = document.querySelector('#submit');

$submit.addEventListener('click', async (e) => {
	e.preventDefault();
	const longUrl = encodeURIComponent($longUrl.value);
	let response = await fetch(`${APT_SERVER}/url/${longUrl}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (response.status === 200) {
		success(await response.json());
	} else {
		console.log(`error: ${response.status}`);
	}
});

const success = (data) => {
	console.log(data.key);
	const $shortUrl = document.querySelector('#shortUrl');
	$shortUrl.textContent = `${data.host}/${data.key}`;
}

console.log(".")
