import Block, {Events} from '../../utils/block';
import {compile} from 'pug';
import template from './input.tmpl';
import './index.scss';
import {validate} from '../../utils/validate';

export default class Input extends Block {
	// eslint-disable-next-line
    constructor(props: InputProps) {
		super('label', {
			value: props.value,
			type: props.type,
			placeholder: props.placeholder,
			name: props.name,
			status: props.status,
			classNames: props.classNames,
			events: {
				...props.events,
				focusout: (e: Event) => {
					const element = e.target as HTMLInputElement;
					this.props.value = element.value;
					const isValid = validate(element);
					if (!isValid) {
						this.setProps({status: 'error'});
					} else {
						this.setProps({status: ''});
					}
				},
			},
		});
	}

	render() {
		const {type, placeholder, name, status, value} = this.props;
		const component = compile(template);
		return component({type, placeholder, name, status, value});
	}
}

type InputProps = {
    value?: string;
    type?: string;
    placeholder?: string;
    classNames?: string;
    name?: string;
    events?: Events;
    status?: string;
};
