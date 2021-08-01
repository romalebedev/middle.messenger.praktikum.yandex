import '../../index.scss';
import './index.scss';
import { compile } from 'pug';
import Block, { Props } from '../../utils/block';
import { renderDom } from '../../utils/render-DOM';
import template from './500.tmpl';

class Page extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return compile(template, {})();
    }
}

const page: Page = new Page({ classNames: 'container' });

renderDom('#root', page);
