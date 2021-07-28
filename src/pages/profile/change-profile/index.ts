import '../../../index.scss';
import './index.scss';
import {compile} from 'pug'
import Block, { Props } from '../../../utils/block';
import { renderDom } from '../../../utils/render-DOM';
import template from './change-profile.tmpl';
import Button from '../../../components/button';

class Page extends Block {
    constructor(props: Props) {
        super('div', props)
    }

    render() {
        return (compile(template, {})(this.props))
    }
}

const page: Page = new Page({classNames: 'container'})

const button = new Button({
    text: 'Сохранить'
})

renderDom('#root', page)
renderDom('.form', button)
