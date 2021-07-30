export default `
input(type=type, placeholder=placeholder name=name).input
span(class=status === "error" ? 'error show' : 'hide')=placeholder+" неправильный"
`
