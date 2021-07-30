import Block, {Events} from "../../utils/block";
import { compile } from "pug";
import template from './input.tmpl'
import "./index.scss";

export default class Input extends Block {
    constructor(props: InputProps) {
        super("label", props);
    }
    render() {
        const {type, placeholder, name, status} = this.props
        const component = compile(template);
        return component({type, placeholder, name, status});
    }
}

type InputProps = {
    type?: string;
    placeholder?: string;
    classNames?: string;
    name?: string;
    events?: Events;
    status?: string;
};
