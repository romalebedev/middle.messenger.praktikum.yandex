import Block, {Events} from '../../utils/block';
import {compile} from 'pug';
import template from './button.tmpl';
import './index.scss';

export default class Button extends Block {
	constructor(props: ButtonProps) {
		super('button', props);
	}

	render() {
		const {text} = this.props;
		const component = compile(template);
		return component({text});
	}
}

type ButtonProps = {
  text?: string;
  events?: Events;
};
