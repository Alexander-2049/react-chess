import React from 'react';
import styles from './styles/BoardWrapper.module.scss';

interface BoardWrapperInterface {
    children?: React.ReactNode;
}

const BoardWrapper = (props: BoardWrapperInterface) => {
    const children = props.children;

    return (
        <div className={styles.BoardWrapper}>
            {children}
        </div>
    );
};

export default BoardWrapper;