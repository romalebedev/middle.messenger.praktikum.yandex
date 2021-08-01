import Block from './block';

export function renderDom(query: string, block: Block) {
    const root: HTMLElement | null = document.querySelector(query);

    return root && root.appendChild(block.getContent());
}
