export default `
input(type=type, placeholder=placeholder name=name value=value).input
span(class=status === "error" ? 'error show' : 'hide')=placeholder+" неправильный"
`
