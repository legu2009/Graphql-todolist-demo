module.exports.Authorize = function(target, key, descriptor) {
	const fun = target[key];
	return target[key] = async function (_, __, ___) {
		var user = ___.user
        if (!user) {
            return {
				code: -1,
                success: false,
                message: '身份错误'
			}
		}
		return await fun.call(this, _, __, ___);
	}
}
