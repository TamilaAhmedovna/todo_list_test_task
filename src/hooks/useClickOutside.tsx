import { useEffect } from 'react';

export function useOutsideClick(
    ref: any,
    onClickOut: () => void,
    deps: any[] = []
) {
    useEffect(() => {
        const onClick = ({ target }: any) =>
            ref.current && 
            !ref.current.contains(target) && 
            onClickOut?.()
        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, deps);

    return ref
}
