module.exports.Authorize = function(fn) {
    return function(_, __, ___) {
        var user = ___.user
        if (!user)
            return {
                success: false,
                message: '身份错误'
            }
        return fn.call(this, _, __, ___)
    }
}
