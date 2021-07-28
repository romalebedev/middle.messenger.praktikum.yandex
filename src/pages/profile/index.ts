import '../../index.scss';
import './index.scss';
import '../../components/button';
import './change-password/index.scss';
import {compile} from 'pug'
import Block, { Props } from '../../utils/block';
import { renderDom } from '../../utils/render-DOM';
import template from './profile.tmpl';
import Button from '../../components/button';

class Page extends Block {
    constructor(props: Props) {
        super('div', props)
    }

    render() {
        console.log(compile(template, {}))
        return (compile(template, {})(this.props))
    }
}

const page: Page = new Page({classNames: 'container'})

const button = new Button({
    text: 'Изменить данные'
})

renderDom('#root', page)
renderDom('.form', button)

