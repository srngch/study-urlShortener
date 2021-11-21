const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const base = alphabet.length;

const encode = (num) => {
	let encoded = "";
	while (num > 0) {
		let remainder = num % base;
		num = Math.floor(num / base);
		encoded = alphabet[remainder].toString() + encoded;
	}
	return encoded;
}

const decode = (str) => {
	let decoded = 0;
	while (str) {
		const index = alphabet.indexOf(str[0]);
		const power = str.length - 1;
		decoded += index * (Math.pow(base, power));
		str = str.substring(1);
	}
	return decoded;
}

module.exports = { encode, decode };
