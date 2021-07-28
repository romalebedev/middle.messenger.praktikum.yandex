import Block from "../../utils/block";
import { compile } from "pug";
import "./index.scss";

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render() {
    const {text} = this.props
    const component = compile(
`
=text
`);
    return component({text});
  }
}

type ButtonProps = {
  text?: string;
  link?: string;
};
