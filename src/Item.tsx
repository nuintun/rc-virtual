/**
 * @module Item
 */

import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface SizeInfo {
  index: number;
  rect: DOMRect;
  entries: ResizeObserverEntry[];
}

export interface ItemProps {
  index: number;
  onResize: (size: SizeInfo) => void;
  children: (index: number) => React.ReactNode;
}

export default class Item extends React.PureComponent<ItemProps> {
  private observer: ResizeObserver;

  private node: React.RefObject<HTMLDivElement> = React.createRef();

  private onResize = (entries: ResizeObserverEntry[]): void => {
    const node: HTMLDivElement | null = this.node.current;

    if (node) {
      const { index }: ItemProps = this.props;
      const rect: DOMRect = node.getBoundingClientRect();

      this.props.onResize({ rect, index, entries });
    }
  };

  public componentDidMount(): void {
    const node: HTMLDivElement | null = this.node.current;
    const observer: ResizeObserver = new ResizeObserver(this.onResize);

    observer.observe(node as HTMLDivElement);

    this.observer = observer;
  }

  public componentWillUnmount(): void {
    this.observer.disconnect();
  }

  public render(): React.ReactNode {
    const { index, children }: ItemProps = this.props;

    return (
      <div ref={this.node} date-role="vlist-item">
        {children(index)}
      </div>
    );
  }
}
