import Block from './block';

export function renderDom(query: string, block: Block | null): HTMLElement | null {
    const root: HTMLElement | null = document.querySelector(query);
    return block && root && root.appendChild(block.getContent());
}
