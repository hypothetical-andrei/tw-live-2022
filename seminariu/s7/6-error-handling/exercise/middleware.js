const checkIds = (req, res, next) => {
	let isIdInvalid = false
	for (const id in req.params) {
		if (isNaN(parseInt(req.params[id]))) {
			isIdInvalid = true
			break
		}
	}
	if (isIdInvalid) {
		res.status(400).json({ message: 'invalid id' })
	} else {
		next()
	}
}
module.exports = {
  checkIds
}