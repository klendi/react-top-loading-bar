import * as React from 'react';
import { CSSProperties } from 'react';

interface IProps {
    progress?: number;
    color?: string;
    shadow?: boolean;
    background?: string;
    height?: number;
    onLoaderFinished?: () => void;
    className?: string;
    containerClassName?: string;
    loaderSpeed?: number;
    transitionTime?: number;
    waitingTime?: number;
    style?: CSSProperties;
    containerStyle?: CSSProperties;
    shadowStyle?: CSSProperties;
}
interface LoadingBarRef {
    continuousStart: (startingValue?: number, refreshRate?: number) => void;
    staticStart: (startingValue?: number) => void;
    start: (type?: "continuous" | "static", startingValue?: number, refreshRate?: number) => void;
    complete: () => void;
    increase: (value: number) => void;
    decrease: (value: number) => void;
    getProgress: () => number;
}
declare const LoadingBar: React.ForwardRefExoticComponent<IProps & React.RefAttributes<LoadingBarRef>>;
interface IContext extends Omit<LoadingBarRef, "continuousStart" | "staticStart"> {
    setProps: (props: IProps) => void;
}
declare const LoadingBarContainer: ({ children, props, }: {
    children: React.ReactNode;
    props?: Omit<IProps, "progress">;
}) => React.JSX.Element;
declare const useLoadingBar: (props?: IProps) => Omit<IContext, "setProps">;

export { type IProps, LoadingBarContainer, type LoadingBarRef, LoadingBar as default, useLoadingBar };
