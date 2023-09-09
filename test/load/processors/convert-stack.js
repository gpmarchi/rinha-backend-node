function convertStack(requestParams, ctx, ee, next) {
  if (ctx.vars.stack !== 'null') {
    ctx.vars.stack = ctx.vars.stack.split(',')
  } else {
    ctx.vars.stack = null
  }

  return next()
}

module.exports = {
  convertStack,
}
